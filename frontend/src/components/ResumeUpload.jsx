import { Upload, FileText, CheckCircle2 } from "lucide-react"

function ResumeUpload({ file, setFile }) {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-slate-300">
      <div className="flex items-center gap-2 mb-4">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">1</span>
        <h2 className="text-base font-semibold text-slate-900">
          Upload Your Resume
        </h2>
      </div>

      <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 text-center transition hover:bg-slate-50">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-slate-700">
          <Upload size={22} />
        </div>

        <p className="text-sm font-medium text-slate-700">
          Upload candidate profile document
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Supported formats: PDF, DOCX
        </p>

        <label className="mt-4 inline-flex items-center gap-2 cursor-pointer rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow hover:bg-slate-800 transition">
          <FileText size={16} />
          <span>{file ? "Replace Resume" : "Choose File"}</span>
          <input
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {file && (
          <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-emerald-50 py-2 px-3 border border-emerald-100 text-emerald-800 text-xs font-medium">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span className="truncate max-w-xs">{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumeUpload
