function SkillMatrix({ analysis }) {
  const matched = analysis?.matched_skills || []
  const missing = analysis?.missing_skills || []

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Skill Intelligence Matrix
        </p>

        <h3 className="mt-1 text-xl font-bold text-slate-900">
          Profile vs Job Skill Position
        </h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Matched Skills */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Matched Competencies
            </h4>

            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
              {matched.length} verified
            </span>
          </div>

          <div className="space-y-2">
            {matched.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No direct matches found.</p>
            ) : (
              matched.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center justify-between rounded-xl bg-emerald-50/70 border border-emerald-100 px-4 py-2.5"
                >
                  <span className="text-xs font-semibold text-emerald-900">
                    {skill}
                  </span>

                  <span className="text-xs font-bold text-emerald-600">
                    ✓
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Skill Gaps to Bridge
            </h4>

            <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-bold text-rose-800">
              {missing.length} missing
            </span>
          </div>

          <div className="space-y-2">
            {missing.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No gaps detected!</p>
            ) : (
              missing.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center justify-between rounded-xl bg-rose-50/50 border border-rose-100 px-4 py-2.5"
                >
                  <span className="text-xs font-semibold text-slate-800">
                    {skill}
                  </span>

                  <span className="text-xs font-bold text-rose-500">
                    !
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillMatrix
