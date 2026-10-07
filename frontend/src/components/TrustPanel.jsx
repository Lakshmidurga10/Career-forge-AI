import { CheckCircle2, Shield } from "lucide-react"

function TrustPanel({ report }) {
  if (!report) return null

  const notes = report.trust_notes || []

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
          <Shield size={20} />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900">
            AI Trust & Grounding Guardrails
          </h3>

          <p className="text-xs text-slate-500">
            How CareerForge AI protects against hallucinations and unsupported claims
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {notes.map((note, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-100 p-3.5"
          >
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {note}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrustPanel
