import React, { useState } from "react";
import {
  LuArrowDownLeft,
  LuCircleDollarSign,
  LuReceipt,
  LuSearch,
  LuUsers,
  LuWallet,
} from "react-icons/lu";
import StudentList from "../../Constants/Studetns.json";
import TeacherList from "../../Constants/Teachers.json";

const formatAmount = (amount) =>
  `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount)} Afs`;

const Payments = () => {
  const [paymentType, setPaymentType] = useState("students");
  const [statusFilter, setStatusFilter] = useState("All status");
  const [searchQuery, setSearchQuery] = useState("");

  const studentPayments = StudentList.flatMap((student) =>
    (student.ClassJourny ?? []).map((journey, index) => ({
      id: `${student.Id}-${index}`,
      party: student.name,
      partyId: student.Id,
      detail: journey.ClassName || "Class not assigned",
      round: journey.round || "-",
      reference: journey.billNumber || "-",
      amount: Number(journey.fee) || 0,
      status: journey.feeState?.toLowerCase() === "paid" ? "Paid" : "Pending",
    })),
  );
  const teacherPayments = TeacherList.flatMap((teacher) =>
    (teacher.salary ?? []).map((salary, index) => ({
      id: `${teacher.Id}-${index}`,
      party: `${teacher.firstName} ${teacher.lastName}`.trim(),
      partyId: teacher.Id,
      detail: teacher.department || "Teacher salary",
      round: salary.round || "-",
      reference: teacher.employmentType || "Salary",
      amount: Number(salary.salary) || 0,
      status: salary.salaryState?.toLowerCase() === "paid" ? "Paid" : "Pending",
    })),
  );
  const allFeeAmount = studentPayments.reduce(
    (total, payment) => total + payment.amount,
    0,
  );
  const collectedAmount = studentPayments
    .filter((payment) => payment.status === "Paid")
    .reduce((total, payment) => total + payment.amount, 0);
  const outstandingAmount = allFeeAmount - collectedAmount;
  const salaryPaid = teacherPayments
    .filter((payment) => payment.status === "Paid")
    .reduce((total, payment) => total + payment.amount, 0);
  const sourcePayments =
    paymentType === "students" ? studentPayments : teacherPayments;
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visiblePayments = sourcePayments.filter((payment) => {
    const matchesStatus =
      statusFilter === "All status" || payment.status === statusFilter;
    const matchesQuery =
      !normalizedQuery ||
      [
        payment.party,
        payment.partyId,
        payment.detail,
        payment.round,
        payment.reference,
      ].some((value) => value.toLowerCase().includes(normalizedQuery));
    return matchesStatus && matchesQuery;
  });
  const collectionRate = allFeeAmount
    ? Math.round((collectedAmount / allFeeAmount) * 100)
    : 0;
  const summaryCards = [
    {
      label: "Fees billed",
      value: formatAmount(allFeeAmount),
      detail: `${studentPayments.length} student records`,
      icon: LuWallet,
      accent: "text-sky-300",
    },
    {
      label: "Fees collected",
      value: formatAmount(collectedAmount),
      detail: `${collectionRate}% collection rate`,
      icon: LuCircleDollarSign,
      accent: "text-emerald-300",
    },
    {
      label: "Outstanding",
      value: formatAmount(outstandingAmount),
      detail: `${studentPayments.filter((payment) => payment.status === "Pending").length} unpaid records`,
      icon: LuArrowDownLeft,
      accent: "text-amber-300",
    },
    {
      label: "Teacher salary paid",
      value: formatAmount(salaryPaid),
      detail: `${teacherPayments.length} salary records`,
      icon: LuUsers,
      accent: "text-violet-300",
    },
  ];

  return (
    <main className="h-full w-full min-w-0 overflow-y-auto bg-gray-900 p-4 text-white sm:p-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-7">
        <header className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
              Finance
            </p>
            <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
              Payments &amp; fees
            </h1>
            <p className="mt-2 text-sm text-white/50">
              Track student fee collection and teacher salary records.
            </p>
          </div>
          <div className="flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-gray-800/70 px-3 py-2 text-xs text-white/60">
            <LuReceipt aria-hidden="true" className="text-emerald-300" />
            Records from current finance data
          </div>
        </header>

        <section
          aria-label="Payment summary"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          {summaryCards.map(({ label, value, detail, icon: Icon, accent }) => (
            <article
              key={label}
              className="rounded-lg border border-white/[0.08] bg-gray-800/55 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-white/50">{label}</p>
                  <p className="mt-3 text-xl font-semibold text-white sm:text-2xl">
                    {value}
                  </p>
                </div>
                <Icon
                  aria-hidden="true"
                  className={`mt-0.5 text-lg ${accent}`}
                />
              </div>
              <p className="mt-2 text-xs text-white/40">{detail}</p>
            </article>
          ))}
        </section>

        <section className="min-w-0">
          <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Payment ledger</h2>
              <p className="mt-1 text-sm text-white/45">
                {visiblePayments.length} of {sourcePayments.length} records
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex w-full items-center gap-1 rounded-lg border border-white/10 bg-gray-800/70 p-1 sm:w-auto">
                {[
                  { id: "students", label: "Student fees" },
                  { id: "teachers", label: "Teacher salaries" },
                ].map((tab) => (
                  <button
                    type="button"
                    key={tab.id}
                    aria-pressed={paymentType === tab.id}
                    onClick={() => {
                      setPaymentType(tab.id);
                      setStatusFilter("All status");
                    }}
                    className={`min-h-9 flex-1 rounded-md px-3 text-xs font-medium transition-colors sm:flex-none ${paymentType === tab.id ? "bg-emerald-300 text-gray-950" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <label className="relative min-w-0 flex-1 sm:w-56 sm:flex-none">
                <LuSearch
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/35"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search payments"
                  aria-label="Search payment records"
                  className="h-10 w-full rounded-lg border border-white/10 bg-gray-800/70 pl-9 pr-3 text-sm text-white placeholder:text-white/35 focus:border-emerald-300/50"
                />
              </label>
            </div>
          </div>

          <div
            className="mb-4 flex flex-wrap gap-2"
            aria-label="Filter by status"
          >
            {["All status", "Paid", "Pending"].map((status) => (
              <button
                type="button"
                key={status}
                aria-pressed={statusFilter === status}
                onClick={() => setStatusFilter(status)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${statusFilter === status ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100" : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/80"}`}
              >
                {status}
              </button>
            ))}
          </div>

          {visiblePayments.length > 0 ? (
            <>
              <div className="mb-2 hidden grid-cols-[1.25fr_1.25fr_0.7fr_0.8fr_0.8fr_0.85fr] gap-4 px-4 py-2 text-xs font-medium uppercase tracking-wide text-white/35 lg:grid">
                <span>
                  {paymentType === "students" ? "Student" : "Teacher"}
                </span>
                <span>
                  {paymentType === "students" ? "Class" : "Department"}
                </span>
                <span>Round</span>
                <span>Reference</span>
                <span>Status</span>
                <span className="text-right">Amount</span>
              </div>
              <div className="flex flex-col gap-2">
                {visiblePayments.map((payment) => (
                  <article
                    key={payment.id}
                    className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 rounded-lg border border-white/[0.07] bg-gray-800/45 p-4 transition-colors hover:border-emerald-300/20 hover:bg-gray-800/75 lg:grid-cols-[1.25fr_1.25fr_0.7fr_0.8fr_0.8fr_0.85fr] lg:gap-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {payment.party}
                      </p>
                      <p className="mt-1 truncate font-mono text-[11px] text-white/40">
                        {payment.partyId}
                      </p>
                    </div>
                    <div className="col-span-2 min-w-0 lg:col-span-1">
                      <span className="mb-1 block text-[10px] uppercase tracking-wide text-white/35 lg:hidden">
                        {paymentType === "students" ? "Class" : "Department"}
                      </span>
                      <p className="truncate text-sm text-white/65">
                        {payment.detail}
                      </p>
                    </div>
                    <div>
                      <span className="mb-1 block text-[10px] uppercase tracking-wide text-white/35 lg:hidden">
                        Round
                      </span>
                      <p className="text-sm text-white/65">{payment.round}</p>
                    </div>
                    <div className="min-w-0">
                      <span className="mb-1 block text-[10px] uppercase tracking-wide text-white/35 lg:hidden">
                        Reference
                      </span>
                      <p className="truncate text-sm text-white/55">
                        {payment.reference}
                      </p>
                    </div>
                    <div>
                      <span className="mb-1 block text-[10px] uppercase tracking-wide text-white/35 lg:hidden">
                        Status
                      </span>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${payment.status === "Paid" ? "bg-emerald-300/10 text-emerald-200" : "bg-amber-300/10 text-amber-200"}`}
                      >
                        {payment.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="mb-1 block text-[10px] uppercase tracking-wide text-white/35 lg:hidden">
                        Amount
                      </span>
                      <p className="text-sm font-semibold text-white">
                        {formatAmount(payment.amount)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-white/15 px-5 py-12 text-center">
              <LuReceipt
                aria-hidden="true"
                className="mx-auto text-2xl text-white/30"
              />
              <h3 className="mt-3 text-sm font-medium text-white/80">
                No payment records found
              </h3>
              <p className="mt-1 text-xs text-white/45">
                Try another status or search term.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Payments;
