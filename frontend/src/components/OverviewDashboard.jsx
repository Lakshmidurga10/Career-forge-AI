import MetricCard from "./MetricCard"
import ScoreExplanation from "./ScoreExplanation"
import AIInsight from "./AIInsight"

function OverviewDashboard({
  candidate,
  job,
  analysis,
}) {
  if (!analysis) return null

  const atsScore = analysis.ats_analysis?.ats_score ?? 0
  const readiness = analysis.readiness_level || "Interview Ready"

  return (
    <div className="space-y-6">
      {/* Top 3 High-Impact Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Job Match"
          value={`${analysis.match_score}%`}
          description="Overall role compatibility"
          icon="◎"
        />

        <MetricCard
          title="ATS Keyword Score"
          value={`${atsScore}%`}
          description="Direct keyword alignment"
          icon="⌕"
        />

        <MetricCard
          title="Candidate Readiness"
          value={readiness}
          description="Current preparation level"
          icon="✓"
        />
      </div>

      {/* Target Role Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Target Job Specification
            </p>

            <h3 className="mt-1 text-xl font-black text-slate-900">
              {job?.job_title || "Target Role"}
            </h3>

            <p className="text-xs text-slate-500 font-medium">
              {job?.company || "Company not specified"} • {job?.experience_required || "0-2 years"}
            </p>
          </div>

          <span className="w-fit rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-xs font-bold text-indigo-700">
            {analysis.career_level || "Entry Level / Fresher"}
          </span>
        </div>
      </div>

      {/* Scoring Engine Breakdown + AI Insights */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ScoreExplanation analysis={analysis} />
        </div>

        <AIInsight analysis={analysis} />
      </div>
    </div>
  )
}

export default OverviewDashboard
