const TeacherDashboard = ({ logedInPerson = {} }) => {
  const fullName = [logedInPerson.firstName, logedInPerson.lastName]
    .filter(Boolean)
    .join(" ");
  const profileImage =
    logedInPerson.profileImage && logedInPerson.profileImage !== "-"
      ? logedInPerson.profileImage
      : null;

  return (
    <div className="flex-1 min-w-0 h-full overflow-y-auto bg-[var(--color)] p-6 text-white">
      <header className="flex items-center gap-4 rounded-xl bg-gray-800 p-5">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-gray-700">
          {profileImage ? (
            <img
              src={profileImage}
              alt={fullName || "Teacher profile"}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-xl font-semibold">
              {fullName ? fullName.charAt(0) : "?"}
            </span>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{fullName || "Teacher"}</h1>
          <p className="text-white/60">{logedInPerson.subject || "Teacher"}</p>
        </div>
      </header>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl bg-gray-800 p-5">
          <p className="text-sm text-white/60">Teacher ID</p>
          <p className="mt-2 text-lg font-semibold">
            {logedInPerson.Id || "—"}
          </p>
        </div>
        <div className="rounded-xl bg-gray-800 p-5">
          <p className="text-sm text-white/60">Department</p>
          <p className="mt-2 text-lg font-semibold">
            {logedInPerson.department || "—"}
          </p>
        </div>
        <div className="rounded-xl bg-gray-800 p-5">
          <p className="text-sm text-white/60">Email</p>
          <p className="mt-2 break-all text-lg font-semibold">
            {logedInPerson.email || "—"}
          </p>
        </div>
        <div className="rounded-xl bg-gray-800 p-5 sm:col-span-2 xl:col-span-3">
          <p className="text-sm text-white/60">Classes</p>
          <p className="mt-2 text-lg font-semibold">
            {Array.isArray(logedInPerson.classes)
              ? logedInPerson.classes.join(", ")
              : logedInPerson.classes || "—"}
          </p>
        </div>
      </section>
    </div>
  );
};

export default TeacherDashboard;
