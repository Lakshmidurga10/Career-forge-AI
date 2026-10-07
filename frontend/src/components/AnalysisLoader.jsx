import { Loader2 } from "lucide-react"

function AnalysisLoader() {
  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-sm">
        <Loader2 size={26} className="animate-spin" />
      </div>

      <h2 className="mt-5 text-lg font-bold text-slate-900">
        Analyzing Career Profile & Requirements
      </h2>

      <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
        Extracting competencies, calculating hybrid semantic relevance, identifying critical skill gaps, and assembling tailored roadmap...
      </p>
    </div>
  )
}

export default AnalysisLoader
