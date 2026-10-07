import { Award, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw } from "lucide-react"

function InterviewReport({ report, onRestart }) {
  if (!report) return null

  return (
    <div className="space-y-6">
      {/* Overall Score Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Interview Readiness Score
        </span>

        <p className="mt-2 text-6xl font-black text-slate-900 tracking-tight">
          {Math.round(report.overall_score)}
          <span className="text-xl text-slate-400 font-normal"> / 100</span>
        </p>

        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1 text-xs font-bold text-emerald-800">
          <Award size={14} className="text-emerald-600" />
          {report.readiness_level}
        </div>
      </div>

      {/* 4 Multi-Dimensional Category Scores */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <ScoreCard
          label="Technical Fundamentals"
          value={report.technical_score}
        />

        <ScoreCard
          label="Communication Clarity"
          value={report.communication_score}
        />

        <ScoreCard
          label="Response Relevance"
          value={report.relevance_score}
        />

        <ScoreCard
          label="Confidence & Delivery"
          value={report.confidence_score}
        />
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Demonstrated Strengths
          </h3>

          <ul className="space-y-3">
            {report.strengths?.length > 0 ? (
              report.strengths.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-xs font-medium text-slate-700"
                >
                  <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-xs text-slate-400">No specific strengths captured.</li>
            )}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Areas for Polish
          </h3>

          <ul className="space-y-3">
            {report.weaknesses?.length > 0 ? (
              report.weaknesses.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-xs font-medium text-slate-700"
                >
                  <AlertTriangle size={15} className="text-amber-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-xs text-slate-400">No major weaknesses identified.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Recommended Practice Actions */}
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
          Personalized Interview Next Steps
        </h3>

        <ul className="space-y-3">
          {report.recommendations?.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-100 p-3.5 text-xs text-slate-700 font-medium"
            >
              <span className="font-bold text-indigo-600">{index + 1}.</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {onRestart && (
        <div className="flex justify-center pt-4">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold text-white shadow hover:bg-slate-800 transition"
          >
            <RotateCcw size={14} /> Retake Practice Simulator
          </button>
        </div>
      )}
    </div>
  )
}

function ScoreCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-3xl font-black text-slate-900">
        {Math.round(value || 0)}
      </p>

      <p className="text-[10px] text-slate-400 font-medium">
        / 100 points
      </p>
    </div>
  )
}

export default InterviewReport
