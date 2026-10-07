function ScoreExplanation({ analysis }) {
  if (!analysis?.score_breakdown) {
    return null
  }

  const breakdown = analysis.score_breakdown

  const items = [
    {
      name: "Required Technical Skills",
      score: breakdown.required_skill_score,
      max: 70,
      color: "bg-indigo-600",
    },
    {
      name: "Preferred Job Competencies",
      score: breakdown.preferred_skill_score,
      max: 20,
      color: "bg-violet-600",
    },
    {
      name: "Semantic Context Alignment",
      score: breakdown.semantic_score,
      max: 10,
      color: "bg-sky-600",
    },
    {
      name: "Project Hands-On Relevance",
      score: breakdown.project_score,
      max: 10,
      color: "bg-emerald-600",
    },
  ]

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="border-b border-slate-100 pb-4 mb-5">
        <h2 className="text-base font-bold text-slate-900">
          Why this match score?
        </h2>
        <p className="mt-0.5 text-xs text-slate-500">
          Evaluated via multi-signal ranking combining exact, semantic, preferred, and project experience.
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const percentage =
            item.max > 0 ? Math.min((item.score / item.max) * 100, 100) : 0

          return (
            <div key={item.name}>
              <div className="mb-1.5 flex justify-between text-xs font-semibold">
                <span className="text-slate-700">{item.name}</span>
                <span className="text-slate-900">
                  {item.score} <span className="text-slate-400 font-normal">/ {item.max} pts</span>
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200/60">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-700`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ScoreExplanation
