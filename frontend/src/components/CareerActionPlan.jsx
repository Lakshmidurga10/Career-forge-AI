import { Sparkles, ArrowRight, Clock, Target, CheckCircle2, AlertCircle } from "lucide-react"

function CareerActionPlan({ graph }) {
  if (!graph) return null

  const actions = graph.actions || []

  return (
    <div className="space-y-6">
      {/* Primary Goal & Next Best Action */}
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
            <Sparkles size={12} className="text-amber-500" /> Next Best Career Action
          </span>

          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-bold text-emerald-800">
            Readiness: {graph.readiness_score}% ({graph.readiness_level})
          </span>
        </div>

        <h2 className="mt-3 text-2xl font-black text-slate-900 leading-tight">
          {graph.next_best_action}
        </h2>

        <p className="mt-2 text-xs text-slate-500 font-medium">
          Calculated by synthesizing candidate evidence, target job expectations, and detected skill gaps.
        </p>
      </div>

      {/* Prioritized Action Cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {actions.map((action, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-bold text-slate-900">
                  {action.title}
                </h3>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    action.priority === "High"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {action.priority} Priority
                </span>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {action.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <Clock size={12} /> Estimated effort:
                </span>
                <span className="font-bold text-slate-800">{action.estimated_effort}</span>
              </div>

              <div className="rounded-lg bg-slate-50 p-2.5 text-[11px] text-slate-600 font-medium">
                <span className="font-bold text-slate-700">Rationale: </span>
                {action.reason}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CareerActionPlan
