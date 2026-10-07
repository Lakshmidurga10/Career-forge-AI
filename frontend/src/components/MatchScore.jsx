import { CheckCircle2, Award, Sparkles } from "lucide-react"

function MatchScore({ analysis }) {
  if (!analysis) return null

  const score = analysis.match_score || 0
  const scoreColor =
    score >= 75
      ? "text-emerald-600 border-emerald-500"
      : score >= 50
      ? "text-amber-600 border-amber-500"
      : "text-rose-600 border-rose-500"

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Career Match Analysis
          </h2>
          <p className="text-xs text-slate-500">
            Weighted alignment based on required & preferred competencies
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          <Award size={14} /> Comprehensive Evaluation
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-12 items-center">
        {/* Score dial */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className={`flex h-32 w-32 items-center justify-center rounded-full border-8 bg-white shadow-sm ${scoreColor}`}>
            <div className="text-center">
              <div className="text-3xl font-extrabold tracking-tight">
                {score}%
              </div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Match
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-center font-medium text-slate-600">
            {score >= 75
              ? "Strong Candidate Alignment"
              : score >= 50
              ? "Moderate Match with Gaps"
              : "Significant Skill Upskilling Needed"}
          </p>
        </div>

        {/* Matched Skills */}
        <div className="md:col-span-8 space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Verified Matching Skills ({analysis.matched_skills?.length || 0})
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.matched_skills && analysis.matched_skills.length > 0 ? (
                analysis.matched_skills.map((item, idx) => {
                  const skillName = typeof item === "string" ? item : item.skill
                  const isSemantic = typeof item === "object" && item.match_type === "semantic"

                  return (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200"
                    >
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      {skillName}
                      {isSemantic && (
                        <span className="text-[10px] text-emerald-600/70 font-normal">
                          (semantic)
                        </span>
                      )}
                    </span>
                  )
                })
              ) : (
                <span className="text-xs text-slate-400 italic">No matching skills detected</span>
              )}
            </div>
          </div>

          {/* Strengths */}
          {analysis.strengths && analysis.strengths.length > 0 && (
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Candidate Strengths
              </h3>
              <ul className="space-y-1 text-xs text-slate-700">
                {analysis.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Sparkles size={14} className="text-indigo-600 mt-0.5 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MatchScore
