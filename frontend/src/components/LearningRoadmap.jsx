import { Compass, Sparkles } from "lucide-react"

function LearningRoadmap({ analysis }) {
  if (!analysis) {
    return null
  }

  const gaps = analysis.missing_skills || []

  if (gaps.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Compass size={20} className="text-emerald-600" />
          Personalized Learning Roadmap
        </h2>
        <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-xs font-semibold text-emerald-800">
          🎉 You currently have no major missing required skills. Focus on deep system mastery and mock interview preparation!
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Compass size={20} className="text-indigo-600" />
            Personalized Upskilling Roadmap
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Prioritized sequence of skills to master to maximize your interview conversion rate
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {gaps.length} Target Areas
        </span>
      </div>

      <div className="space-y-4">
        {gaps.map((skill, index) => {
          const progressWeight = Math.max(30, 100 - index * 18)
          const priorityLabel = index === 0 ? "Highest Priority" : index === 1 ? "Secondary Priority" : "Recommended"

          return (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-200 transition"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-xs font-black text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {typeof skill === "string" ? skill : skill.skill || JSON.stringify(skill)}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Target competency required for role qualification
                    </p>
                  </div>
                </div>

                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  {priorityLabel}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 mb-1.5">
                  <span>Impact Priority Weight</span>
                  <span>{progressWeight}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100 border border-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600"
                    style={{ width: `${progressWeight}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LearningRoadmap
