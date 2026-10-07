import { useState } from "react"
import { downloadResume } from "../services/api"
import { Download, Loader2, CheckCircle2 } from "lucide-react"

function ResumeResult({ resume }) {
  const [downloading, setDownloading] = useState(false)

  if (!resume) {
    return null
  }

  const handleDownload = async () => {
    try {
      setDownloading(true)
      const blob = await downloadResume(resume)
      const url = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }))
      const link = document.createElement("a")
      link.href = url
      link.download = "tailored_resume.pdf"
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Resume download failed:", error)
    } finally {
      setDownloading(false)
    }
  }

  const formatItem = (item) => {
    if (typeof item === "string") return item
    if (typeof item === "object" && item !== null) {
      if (item.name && item.description) return `${item.name}: ${item.description}`
      if (item.title) return `${item.title}${item.company ? ` at ${item.company}` : ''}`
      return JSON.stringify(item)
    }
    return String(item)
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            📄 Tailored ATS-Optimized Resume
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Engineered specifically for target job alignment without inventing candidate history
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-slate-800 disabled:opacity-50 transition"
          >
            {downloading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Download size={15} />
            )}
            Download ATS PDF
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Professional Summary */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Professional Summary
          </h3>
          <p className="rounded-xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-700 border border-slate-100">
            {resume.professional_summary}
          </p>
        </div>

        {/* Highlighted Skills */}
        {resume.skills && resume.skills.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Role-Relevant Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-lg bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-800"
                >
                  {formatItem(skill)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume.projects && resume.projects.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Highlighted Projects
            </h3>
            <div className="space-y-2">
              {resume.projects.map((project, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-800 leading-relaxed"
                >
                  {formatItem(project)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {resume.experience && resume.experience.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Experience
            </h3>
            <div className="space-y-3">
              {resume.experience.map((exp, index) => (
                <div key={index} className="rounded-xl border border-slate-200 p-3.5 text-xs">
                  {typeof exp === "object" && exp !== null ? (
                    <div>
                      <div className="font-bold text-slate-900">{exp.title} {exp.company ? `— ${exp.company}` : ''}</div>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="mt-2 list-disc list-inside space-y-1 text-slate-600">
                          {exp.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <span>{formatItem(exp)}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resume.certifications && resume.certifications.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Certifications
            </h3>
            <ul className="list-disc space-y-1 pl-5 text-xs text-slate-700">
              {resume.certifications.map((cert, i) => (
                <li key={i}>{formatItem(cert)}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ATS Keywords Used */}
        {resume.ats_keywords_used && resume.ats_keywords_used.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              ATS Job Keywords Incorporated
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {resume.ats_keywords_used.map((keyword, index) => (
                <span
                  key={index}
                  className="rounded-md bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-xs font-medium text-indigo-700"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* AI Improvements Breakdown */}
        {resume.improvements && resume.improvements.length > 0 && (
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Strategic AI Optimizations Made
            </h3>
            <ul className="list-disc space-y-1.5 pl-5 text-xs text-slate-600 leading-relaxed">
              {resume.improvements.map((improvement, index) => (
                <li key={index}>{improvement}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumeResult
