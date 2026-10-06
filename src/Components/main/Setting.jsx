import React, { useEffect, useState } from "react";
import {
  LuBookOpen,
  LuCheck,
  LuDownload,
  LuGraduationCap,
  LuPlus,
  LuRotateCcw,
  LuSearch,
  LuSettings2,
  LuShieldCheck,
  LuTrash2,
  LuUsers,
  LuX,
} from "react-icons/lu";
import StudentDefaults from "../../Constants/Studetns.json";
import UserDefaults from "../../Constants/Teachers.json";
import ExamDefaults from "../../Constants/Exams.json";

const storageKey = "professional-dashboard-settings-v1";
const categories = [
  { key: "users", label: "Users & staff", icon: LuUsers },
  { key: "students", label: "Students", icon: LuGraduationCap },
  { key: "exams", label: "Exams", icon: LuBookOpen },
];
const defaultRecords = {
  users: UserDefaults,
  students: StudentDefaults,
  exams: ExamDefaults,
};

const loadRecords = () => {
  if (typeof window === "undefined") return defaultRecords;
  try {
    const savedRecords = JSON.parse(window.localStorage.getItem(storageKey));
    if (!savedRecords || typeof savedRecords !== "object")
      return defaultRecords;
    return Object.fromEntries(
      Object.entries(defaultRecords).map(([key, defaults]) => [
        key,
        Array.isArray(savedRecords[key]) ? savedRecords[key] : defaults,
      ]),
    );
  } catch {
    return defaultRecords;
  }
};

const makeNewRecord = (category) => {
  const newId = `${Date.now()}`;
  if (category === "students") {
    return {
      Id: `stu-${newId}`,
      name: "",
      fathername: "",
      lastname: "",
      phone: "",
      email: "",
      joinDate: "",
      presence: "Active",
      profileImage: "",
      ClassJourny: [],
    };
  }
  if (category === "users") {
    return {
      Id: `tch-${newId}`,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      Role: "teacher",
      gender: "",
      age: 0,
      department: "",
      subject: "",
      joiningDate: "",
      employmentType: "",
      salary: [],
      state: "Active",
      attendance: "",
      performance: "",
      emergencyContact: "",
      profileImage: "",
      classes: [],
      password: "",
    };
  }
  return { round: "", middle_tests: [], final_tests: [] };
};

const displayName = (record, category, index) => {
  if (category === "students") return record.name || "Unnamed student";
  if (category === "users") {
    return (
      [record.firstName, record.lastName].filter(Boolean).join(" ") ||
      record.email ||
      "Unnamed user"
    );
  }
  return `Round ${record.round || index + 1}`;
};

const displayDetails = (record, category) => {
  if (category === "students") {
    const currentClass = record.ClassJourny?.at(-1)?.ClassName;
    return [record.Id, currentClass].filter(Boolean).join(" · ");
  }
  if (category === "users") {
    return [record.Id, record.department, record.Role]
      .filter(Boolean)
      .join(" · ");
  }
  const testCount =
    (record.middle_tests?.length ?? 0) + (record.final_tests?.length ?? 0);
  return `${testCount} ${testCount === 1 ? "assessment" : "assessments"}`;
};

const displayStatus = (record, category) => {
  if (category === "students") return record.presence || "No status";
  if (category === "users") return record.state || "No status";
  const states = [...(record.middle_tests ?? []), ...(record.final_tests ?? [])]
    .map((exam) => exam.state)
    .filter(Boolean);
  return states.length ? [...new Set(states)].join(", ") : "No assessments";
};

const humanize = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replaceAll("_", " ")
    .replace(/^./, (character) => character.toUpperCase());

const Setting = () => {
  const [records, setRecords] = useState(loadRecords);
  const [activeCategory, setActiveCategory] = useState("users");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [editorError, setEditorError] = useState("");

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(records));
    } catch {
      // Keep edits available in the current session if storage is unavailable.
    }
  }, [records]);

  const activeConfig = categories.find(
    (category) => category.key === activeCategory,
  );
  const activeRecords = records[activeCategory] ?? [];
  const normalizedSearch = search.trim().toLowerCase();
  const visibleRecords = activeRecords
    .map((record, index) => ({ record, index }))
    .filter(({ record, index }) =>
      [
        displayName(record, activeCategory, index),
        displayDetails(record, activeCategory),
        displayStatus(record, activeCategory),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch),
    );
  const recordCount = Object.values(records).reduce(
    (total, collection) => total + collection.length,
    0,
  );

  const startEditing = (record, index, isNew = false) => {
    setEditorError("");
    setEditing({
      index,
      isNew,
      original: record,
      draft: JSON.parse(JSON.stringify(record)),
    });
  };

  const updateDraft = (field, value) => {
    setEditing((current) => ({
      ...current,
      draft: { ...current.draft, [field]: value },
    }));
  };

  const saveRecord = (event) => {
    event.preventDefault();
    try {
      const updatedRecord = { ...editing.draft };
      Object.entries(editing.original).forEach(([field, originalValue]) => {
        const draftValue = updatedRecord[field];
        if (
          typeof originalValue === "object" &&
          originalValue !== null &&
          typeof draftValue === "string"
        ) {
          updatedRecord[field] = JSON.parse(draftValue);
        }
      });
      if (!updatedRecord.Id && activeCategory !== "exams") {
        throw new Error("A record ID is required.");
      }

      setRecords((current) => {
        const collection = [...current[activeCategory]];
        if (editing.isNew) collection.push(updatedRecord);
        else collection[editing.index] = updatedRecord;
        return { ...current, [activeCategory]: collection };
      });
      setEditing(null);
      setEditorError("");
    } catch {
      setEditorError(
        "Check the structured data fields and make sure they contain valid JSON.",
      );
    }
  };

  const deleteRecord = (index) => {
    const record = activeRecords[index];
    if (
      !window.confirm(
        `Delete ${displayName(record, activeCategory, index)}? This change is stored in this browser.`,
      )
    ) {
      return;
    }
    setRecords((current) => ({
      ...current,
      [activeCategory]: current[activeCategory].filter(
        (_, recordIndex) => recordIndex !== index,
      ),
    }));
  };

  const restoreDefaults = () => {
    if (
      !window.confirm(
        `Restore the original ${activeConfig.label.toLowerCase()} data? Browser edits for this category will be replaced.`,
      )
    ) {
      return;
    }
    setRecords((current) => ({
      ...current,
      [activeCategory]: defaultRecords[activeCategory],
    }));
  };

  const exportRecords = () => {
    const file = new Blob([JSON.stringify(activeRecords, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeCategory}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="h-full w-full min-w-0 overflow-y-auto bg-gray-900 p-4 text-white sm:p-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-7">
        <header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
              Workspace administration
            </p>
            <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
              Settings
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
              Manage users, students, and exam records. Changes are saved in
              this browser.
            </p>
          </div>
          <div className="flex w-fit items-center gap-2 rounded-lg border border-emerald-300/15 bg-emerald-950/25 px-3 py-2 text-xs text-emerald-100/75">
            <LuShieldCheck aria-hidden="true" className="text-emerald-300" />
            Local workspace
          </div>
        </header>

        <section
          className="grid grid-cols-2 gap-3 lg:grid-cols-4"
          aria-label="Workspace summary"
        >
          <div className="rounded-lg border border-white/10 bg-gray-800/65 p-4">
            <p className="text-xs text-white/45">All records</p>
            <p className="mt-2 text-2xl font-semibold">{recordCount}</p>
          </div>
          {categories.map(({ key, label, icon: Icon }) => (
            <div
              className="rounded-lg border border-white/10 bg-gray-800/65 p-4"
              key={key}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-white/45">{label}</p>
                <Icon aria-hidden="true" className="text-emerald-300" />
              </div>
              <p className="mt-2 text-2xl font-semibold">
                {records[key]?.length ?? 0}
              </p>
            </div>
          ))}
        </section>

        <section className="min-w-0">
          <div className="mb-4 flex flex-col gap-4 border-b border-white/10 sm:flex-row sm:items-center sm:justify-between">
            <div
              className="flex max-w-full gap-1 overflow-x-auto"
              role="tablist"
              aria-label="Settings categories"
            >
              {categories.map(({ key, label, icon: Icon }) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === key}
                  key={key}
                  onClick={() => {
                    setActiveCategory(key);
                    setSearch("");
                  }}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-2 border-b-2 px-3 text-sm font-medium transition-colors ${activeCategory === key ? "border-emerald-300 text-emerald-200" : "border-transparent text-white/45 hover:text-white/80"}`}
                >
                  <Icon aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2 pb-3 sm:flex-row sm:items-center">
              <label className="relative min-w-0 sm:w-60">
                <LuSearch
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/35"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={`Search ${activeConfig.label.toLowerCase()}`}
                  className="h-10 w-full rounded-lg border border-white/10 bg-gray-800/70 pl-9 pr-3 text-sm text-white placeholder:text-white/35 focus:border-emerald-300/50"
                />
              </label>
              <button
                type="button"
                onClick={restoreDefaults}
                title={`Restore original ${activeConfig.label}`}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 px-3 text-sm text-white/65 transition-colors hover:bg-white/5 hover:text-white"
              >
                <LuRotateCcw aria-hidden="true" />
                Restore
              </button>
              <button
                type="button"
                onClick={exportRecords}
                title={`Export ${activeConfig.label}`}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 px-3 text-sm text-white/65 transition-colors hover:bg-white/5 hover:text-white"
              >
                <LuDownload aria-hidden="true" />
                Export
              </button>
              <button
                type="button"
                onClick={() =>
                  startEditing(
                    makeNewRecord(activeCategory),
                    activeRecords.length,
                    true,
                  )
                }
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-300 px-3 text-sm font-semibold text-gray-950 transition-colors hover:bg-emerald-200"
              >
                <LuPlus aria-hidden="true" />
                Add record
              </button>
            </div>
          </div>

          <div className="mb-3 hidden grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(8rem,0.7fr)_auto] gap-4 px-4 text-xs font-medium uppercase tracking-wide text-white/35 sm:grid">
            <span>Record</span>
            <span>Details</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>
          <div className="flex flex-col gap-2">
            {visibleRecords.map(({ record, index }) => (
              <article
                className="grid min-w-0 grid-cols-1 gap-3 rounded-lg border border-white/[0.07] bg-gray-800/50 p-4 transition-colors hover:border-emerald-300/20 hover:bg-gray-800/75 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(8rem,0.7fr)_auto] sm:items-center sm:gap-4"
                key={`${activeCategory}-${record.Id ?? record.round ?? index}-${index}`}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {displayName(record, activeCategory, index)}
                  </p>
                  <p className="mt-1 truncate text-xs text-white/40 sm:hidden">
                    {displayDetails(record, activeCategory)}
                  </p>
                </div>
                <p className="hidden min-w-0 truncate text-sm text-white/55 sm:block">
                  {displayDetails(record, activeCategory)}
                </p>
                <div className="flex items-center justify-between gap-3 sm:block">
                  <span className="text-[10px] uppercase tracking-wide text-white/35 sm:hidden">
                    Status
                  </span>
                  <span className="inline-flex max-w-full rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/65">
                    {displayStatus(record, activeCategory)}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-2 border-t border-white/[0.06] pt-3 sm:border-0 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => startEditing(record, index)}
                    aria-label={`Edit ${displayName(record, activeCategory, index)}`}
                    title="Edit record"
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-white/10 px-3 text-xs text-white/70 transition-colors hover:border-emerald-300/25 hover:bg-emerald-300/10 hover:text-emerald-100"
                  >
                    <LuSettings2 aria-hidden="true" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteRecord(index)}
                    aria-label={`Delete ${displayName(record, activeCategory, index)}`}
                    title="Delete record"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/45 transition-colors hover:border-red-300/25 hover:bg-red-300/10 hover:text-red-200"
                  >
                    <LuTrash2 aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
            {visibleRecords.length === 0 && (
              <div className="rounded-lg border border-dashed border-white/15 px-5 py-12 text-center">
                <p className="text-sm font-medium text-white/75">
                  No records found
                </p>
                <p className="mt-1 text-xs text-white/40">
                  Add a record or try a different search.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setEditing(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="record-editor-title"
            className="flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-xl border border-white/10 bg-gray-900 shadow-2xl sm:rounded-xl"
          >
            <header className="flex items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                  {activeConfig.label}
                </p>
                <h2
                  id="record-editor-title"
                  className="mt-1 text-lg font-semibold text-white"
                >
                  {editing.isNew ? "Create record" : "Edit record"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEditing(null)}
                aria-label="Close editor"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <LuX aria-hidden="true" />
              </button>
            </header>
            <form
              onSubmit={saveRecord}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="grid min-h-0 grid-cols-1 gap-4 overflow-y-auto p-5 sm:grid-cols-2 sm:p-6">
                {Object.entries(editing.draft).map(([field, value]) => {
                  const originalValue = editing.original[field];
                  const label = humanize(field);
                  if (field === "password") {
                    return (
                      <label
                        className="flex min-w-0 flex-col gap-1.5"
                        key={field}
                      >
                        <span className="text-xs font-medium text-white/65">
                          Password
                        </span>
                        <input
                          type="password"
                          autoComplete="new-password"
                          value={value ?? ""}
                          onChange={(event) =>
                            updateDraft(field, event.target.value)
                          }
                          className="h-10 rounded-md border border-white/10 bg-gray-800 px-3 text-sm text-white focus:border-emerald-300/50"
                        />
                      </label>
                    );
                  }
                  if (
                    typeof originalValue === "object" &&
                    originalValue !== null
                  ) {
                    return (
                      <label
                        className="flex min-w-0 flex-col gap-1.5 sm:col-span-2"
                        key={field}
                      >
                        <span className="text-xs font-medium text-white/65">
                          {label} data
                        </span>
                        <textarea
                          rows={Math.min(
                            10,
                            Math.max(
                              4,
                              JSON.stringify(originalValue).length / 50,
                            ),
                          )}
                          value={
                            typeof value === "string"
                              ? value
                              : JSON.stringify(value, null, 2)
                          }
                          onChange={(event) =>
                            updateDraft(field, event.target.value)
                          }
                          spellCheck={false}
                          className="min-h-28 rounded-md border border-white/10 bg-gray-950 px-3 py-2 font-mono text-xs leading-5 text-emerald-100 focus:border-emerald-300/50"
                        />
                      </label>
                    );
                  }
                  if (typeof originalValue === "boolean") {
                    return (
                      <label
                        className="flex items-center justify-between gap-4 rounded-md border border-white/10 bg-gray-800/60 p-3"
                        key={field}
                      >
                        <span className="text-xs font-medium text-white/65">
                          {label}
                        </span>
                        <input
                          type="checkbox"
                          checked={Boolean(value)}
                          onChange={(event) =>
                            updateDraft(field, event.target.checked)
                          }
                          className="h-4 w-4 accent-emerald-300"
                        />
                      </label>
                    );
                  }
                  const isNumber = typeof originalValue === "number";
                  return (
                    <label
                      className="flex min-w-0 flex-col gap-1.5"
                      key={field}
                    >
                      <span className="text-xs font-medium text-white/65">
                        {label}
                      </span>
                      <input
                        type={isNumber ? "number" : "text"}
                        step={isNumber ? "any" : undefined}
                        value={value ?? ""}
                        onChange={(event) =>
                          updateDraft(
                            field,
                            isNumber && event.target.value !== ""
                              ? Number(event.target.value)
                              : event.target.value,
                          )
                        }
                        required={field === "Id"}
                        className="h-10 min-w-0 rounded-md border border-white/10 bg-gray-800 px-3 text-sm text-white focus:border-emerald-300/50"
                      />
                    </label>
                  );
                })}
              </div>
              {editorError && (
                <p
                  role="alert"
                  className="px-5 pb-2 text-xs text-red-300 sm:px-6"
                >
                  {editorError}
                </p>
              )}
              <footer className="flex justify-end gap-2 border-t border-white/10 p-4 sm:px-6">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="h-10 rounded-md border border-white/10 px-4 text-sm text-white/65 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-300 px-4 text-sm font-semibold text-gray-950 transition-colors hover:bg-emerald-200"
                >
                  <LuCheck aria-hidden="true" />
                  Save changes
                </button>
              </footer>
            </form>
          </section>
        </div>
      )}
    </main>
  );
};

export default Setting;
