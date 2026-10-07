function DashboardHeader({
  candidate,
  onNewAnalysis,
}) {
  return (
    <header className="border-b bg-white">
      <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Career Intelligence Dashboard
          </p>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcome back, {candidate?.name || "Candidate"}
          </h2>

          <p className="mt-0.5 text-xs text-slate-500 font-medium">
            Analyze your readiness, bridge skill gaps, and prepare for your target role.
          </p>
        </div>

        <button
          onClick={onNewAnalysis}
          className="w-fit rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800"
        >
          + New Analysis
        </button>
      </div>
    </header>
  )
}

export default DashboardHeader
