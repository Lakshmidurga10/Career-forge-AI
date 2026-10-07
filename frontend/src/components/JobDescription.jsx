import { Briefcase } from "lucide-react"

function JobDescription({ jobDescription, setJobDescription }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-slate-300">
      <div className="flex items-center gap-2 mb-4">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">2</span>
        <h2 className="text-base font-semibold text-slate-900">
          Target Job Description
        </h2>
      </div>

      <p className="text-xs text-slate-500 mb-3">
        Paste the target job opening details (responsibilities, skills, qualifications).
      </p>

      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="e.g. Software Engineer: Looking for Python developer with FastAPI, SQL, Docker, and REST API experience..."
        className="min-h-44 w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-xs leading-relaxed text-slate-800 placeholder-slate-400 outline-none focus:border-slate-400 focus:bg-white transition"
      />

      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
        <span>The AI will extract required vs preferred skills</span>
        <span>{jobDescription.length} characters</span>
      </div>
    </div>
  )
}

export default JobDescription
