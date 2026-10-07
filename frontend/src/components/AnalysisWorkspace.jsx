import { FileText, Briefcase, ArrowRight, Loader2 } from "lucide-react"

function AnalysisWorkspace({
  file,
  setFile,
  jobDescription,
  setJobDescription,
  onAnalyze,
  loading,
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Resume Box */}
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">1</span>
            <h2 className="text-base font-bold text-slate-900">
              Upload Resume
            </h2>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Upload candidate profile in PDF or DOCX format (Max 5 MB).
          </p>

          <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-indigo-600 mb-2">
              <FileText size={22} />
            </div>

            <p className="text-xs font-bold text-slate-800">
              {file ? file.name : "Choose candidate resume"}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              {file ? `${(file.size / 1024).toFixed(1)} KB` : "PDF, DOCX · Automatic Text Extraction"}
            </p>

            <input
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={(event) =>
                setFile(event.target.files?.[0] || null)
              }
            />
          </label>
        </div>

        {/* Job Box */}
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">2</span>
            <h2 className="text-base font-bold text-slate-900">
              Target Job Description
            </h2>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Paste target role requirements, responsibilities, and qualifications.
          </p>

          <textarea
            value={jobDescription}
            onChange={(event) =>
              setJobDescription(event.target.value)
            }
            placeholder="e.g. Software Engineer: Looking for Python developer with FastAPI, SQL, Docker, and REST API experience..."
            className="min-h-48 w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-xs leading-relaxed text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:bg-white transition"
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onAnalyze}
          disabled={loading || !file || !jobDescription.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-xs font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 transition"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Analyzing your career profile...
            </>
          ) : (
            <>
              Analyze My Career Fit <ArrowRight size={15} />
            </>
          )}
        </button>
      </div>
    </section>
  )
}

export default AnalysisWorkspace
