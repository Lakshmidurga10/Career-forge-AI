import { CheckCircle2, AlertCircle } from "lucide-react"

function SkillEvidence({ report }) {
  if (!report) return null

  const skillList = report.skill_explanations || []

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Auditable Skill Evidence
        </p>

        <h3 className="mt-1 text-xl font-bold text-slate-900">
          Why each competency is categorized as Matched vs Gap
        </h3>
      </div>

      <div className="space-y-3">
        {skillList.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl border p-4 text-xs transition ${
              item.status === "Matched"
                ? "border-emerald-100 bg-emerald-50/30"
                : "border-rose-100 bg-rose-50/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.status === "Matched" ? (
                  <CheckCircle2 size={16} className="text-emerald-600" />
                ) : (
                  <AlertCircle size={16} className="text-rose-500" />
                )}
                <span className="font-bold text-slate-900 text-sm">{item.skill}</span>
              </div>

              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  item.status === "Matched"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-rose-100 text-rose-800"
                }`}
              >
                {item.status} ({Math.round(item.confidence * 100)}% confidence)
              </span>
            </div>

            <p className="mt-2 text-slate-700 leading-relaxed font-medium">
              {item.explanation}
            </p>

            <p className="mt-1.5 text-[11px] text-slate-500 italic">
              Evidence: {item.evidence}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillEvidence
