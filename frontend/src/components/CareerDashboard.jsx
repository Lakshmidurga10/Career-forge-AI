import { Award, Briefcase, FileSearch, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react"

function ScoreBreakdown({ breakdown }) {
  if (!breakdown) return null

  const items = [
    {
      name: "Required Technical Skills",
      score: breakdown.required_skill_score,
      max: 70,
      color: "bg-indigo-600",
    },
    {
      name: "Preferred Competencies",
      score: breakdown.preferred_skill_score,
      max: 20,
      color: "bg-violet-600",
    },
    {
      name: "Semantic Context Match",
      score: breakdown.semantic_score,
      max: 10,
      color: "bg-sky-600",
    },
    {
      name: "Project Hands-On Overlap",
      score: breakdown.project_score,
      max: 10,
      color: "bg-emerald-600",
    },
  ]

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Explainable Multi-Signal Scoring Engine
          </h3>
          <p className="text-xs text-slate-500">
            Transparent breakdown combining exact, semantic, preferred, and project experience
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-500">
          Max: 100 pts
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const percentage =
            item.max > 0 ? Math.min((item.score / item.max) * 100, 100) : 0

          return (
            <div key={item.name}>
              <div className="mb-1.5 flex justify-between text-xs font-semibold">
                <span className="text-slate-700">{item.name}</span>
                <span className="text-slate-900">
                  {item.score} <span className="text-slate-400 font-normal">/ {item.max} pts</span>
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200/60">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ATSCard({ ats }) {
  if (!ats) return null

  const atsScore = ats.ats_score || 0
  const matchedCount = ats.matched_keywords?.length || 0
  const missingCount = ats.missing_keywords?.length || 0

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <FileSearch size={18} className="text-indigo-600" />
          <h4 className="text-sm font-bold text-slate-900">ATS Keyword Readiness</h4>
        </div>
        <span className="rounded-md bg-indigo-50 border border-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
          {atsScore}% Pass
        </span>
      </div>

      <div className="my-4">
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-black text-slate-900">{atsScore}%</span>
          <span className="text-xs font-medium text-slate-500">Scan Match</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200/80">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-500"
            style={{ width: `${atsScore}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-50 text-xs">
        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
          <CheckCircle2 size={14} className="text-emerald-600" />
          <span>{matchedCount} matched</span>
        </div>
        <div className="flex items-center gap-1.5 text-rose-700 font-medium">
          <AlertCircle size={14} className="text-rose-600" />
          <span>{missingCount} missing</span>
        </div>
      </div>
    </div>
  )
}

function CareerDashboard({ candidate, job, analysis }) {
  if (!candidate || !job || !analysis) {
    return null
  }

  const formatSkill = (item) => {
    if (typeof item === "string") return item
    if (typeof item === "object" && item !== null) {
      return item.skill || JSON.stringify(item)
    }
    return String(item)
  }

  const matchPercent = Math.min(Math.round(analysis.match_score || 0), 100)

  return (
    <div className="space-y-6">
      {/* Header Profile vs Job Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="rounded-md bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-indigo-700">
            Career Analysis Overview
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
            <Award size={14} /> {analysis.readiness_level || "Interview Ready"}
          </span>
        </div>

        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              {candidate.name || "Candidate"}
            </h2>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              Target Role: <span className="text-indigo-600">{job.job_title}</span>
            </p>

            {job.company && (
              <p className="text-xs text-slate-500 font-medium">
                Target Company: {job.company}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start md:items-end">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Overall Job Compatibility
            </p>

            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900">
                {analysis.match_score}%
              </span>
              <span className="text-xs text-slate-500 font-medium">Match</span>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 h-3 w-48 overflow-hidden rounded-full bg-slate-100 border border-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-500"
                style={{ width: `${matchPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Intelligence Cards: ATS Readiness + Recruiter Score + Candidate Level */}
      <div className="grid gap-4 md:grid-cols-3">
        <ATSCard ats={analysis.ats_analysis} />

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-indigo-600" />
              <h4 className="text-sm font-bold text-slate-900">Recruiter Readiness</h4>
            </div>
            <span className="rounded-md bg-indigo-50 border border-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
              Weighted Index
            </span>
          </div>

          <div className="my-4">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-900">
                {analysis.recruiter_score || analysis.match_score}%
              </span>
              <span className="text-xs font-medium text-slate-500">Readiness</span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200/80">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-emerald-600 transition-all duration-500"
                style={{ width: `${Math.min(analysis.recruiter_score || analysis.match_score, 100)}%` }}
              />
            </div>
          </div>

          <p className="text-[11px] text-slate-500 font-medium pt-2 border-t border-slate-50">
            Computed from candidate skills (60%), ATS (25%), and projects (15%).
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Briefcase size={18} className="text-indigo-600" />
              <h4 className="text-sm font-bold text-slate-900">Candidate Classification</h4>
            </div>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
              Evaluated
            </span>
          </div>

          <div className="my-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Level</p>
            <p className="text-lg font-black text-indigo-700 mt-0.5">
              {analysis.career_level || "Entry Level / Fresher"}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Verified: {candidate.projects?.length || 0} project(s) & {candidate.experience?.length || 0} work role(s)
            </p>
          </div>

          <div className="pt-2 border-t border-slate-50 text-[11px] text-slate-600 font-medium">
            Stage: <span className="font-bold text-indigo-600">{analysis.readiness_level || "Interview Ready"}</span>
          </div>
        </div>
      </div>

      {/* Multi-Factor Score Breakdown */}
      {analysis.score_breakdown && (
        <ScoreBreakdown breakdown={analysis.score_breakdown} />
      )}

      {/* Strengths */}
      {analysis.strengths && analysis.strengths.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
            Candidate Core Strengths
          </h3>

          <div className="grid gap-3 md:grid-cols-2">
            {analysis.strengths.map((strength, index) => (
              <div
                key={index}
                className="rounded-xl bg-emerald-50/70 border border-emerald-100 p-3.5 text-xs font-medium text-emerald-900"
              >
                ✓ {strength}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Matching skills */}
      {analysis.matched_skills && analysis.matched_skills.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
            Validated Matching Skills ({analysis.matched_skills.length})
          </h3>

          <div className="flex flex-wrap gap-2">
            {analysis.matched_skills.map((skill, index) => (
              <span
                key={index}
                className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-800"
              >
                ✓ {formatSkill(skill)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Critical gaps with priority & action guidance */}
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
          Identified Skill Gaps
        </h3>

        <div className="space-y-3">
          {(!analysis.critical_gaps || analysis.critical_gaps.length === 0) ? (
            <div className="rounded-xl bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 border border-emerald-100">
              🎉 No critical skill gaps detected. You meet all primary technical criteria!
            </div>
          ) : (
            analysis.critical_gaps.map((gap, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 rounded-xl border border-rose-100 bg-rose-50/40 p-4 md:flex-row md:items-center md:justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-slate-900 text-sm">{gap.skill}</p>
                  <p className="mt-0.5 text-slate-600">{gap.reason}</p>
                  {gap.action && (
                    <p className="mt-1 text-slate-800 font-medium bg-white/70 rounded p-1.5 border border-rose-100">
                      💡 {gap.action}
                    </p>
                  )}
                </div>
                <span className="w-fit rounded-full bg-rose-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-700 shrink-0">
                  {gap.priority || "Critical"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
            Actionable Career Recommendations
          </h3>

          <div className="space-y-2.5">
            {analysis.recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex gap-3 rounded-xl bg-slate-50 border border-slate-100 p-3.5 text-xs text-slate-700"
              >
                <span className="font-bold text-indigo-600">{index + 1}.</span>
                <p className="leading-relaxed">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CareerDashboard
