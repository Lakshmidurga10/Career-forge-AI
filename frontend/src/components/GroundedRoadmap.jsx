import { BookOpen, Terminal, HelpCircle, ShieldCheck, CheckCircle2 } from "lucide-react"

function GroundedRoadmap({ plan }) {
  if (!plan?.learning_plan?.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <CheckCircle2 size={32} className="text-emerald-600 mx-auto mb-2" />
        <p className="text-sm font-bold text-slate-800">
          No critical learning gaps detected!
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Your profile satisfies the primary technical competencies for this role.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-indigo-600" />
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            RAG-Grounded Learning Architecture
          </p>
        </div>

        <h2 className="mt-2 text-xl font-black text-slate-900 leading-snug">
          Personalized Competency Action Tracks
        </h2>

        <p className="mt-1 text-xs text-slate-500 font-medium">
          Curated learning topics, practice challenges, and interview targets retrieved from structured career knowledge.
        </p>
      </div>

      {plan.learning_plan.map((item, index) => (
        <div
          key={index}
          className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm space-y-5"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Action Track {index + 1}
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                {item.skill}
              </h3>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                item.priority === "Critical" || item.priority === "High"
                  ? "bg-rose-100 text-rose-700 border border-rose-200"
                  : "bg-amber-100 text-amber-700 border border-amber-200"
              }`}
            >
              {item.priority} Priority
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <TrackColumn
              title="1. Core Topics to Learn"
              items={item.topics}
              icon={<BookOpen size={14} className="text-indigo-600" />}
            />

            <TrackColumn
              title="2. Hands-On Practice"
              items={item.practice_tasks}
              icon={<Terminal size={14} className="text-emerald-600" />}
            />

            <TrackColumn
              title="3. Interview Target Concepts"
              items={item.interview_topics}
              icon={<HelpCircle size={14} className="text-violet-600" />}
            />
          </div>

          {item.evidence_to_build && (
            <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Verified Evidence to Build Before Resume Update:</span>
              </div>

              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 font-medium">
                {item.evidence_to_build}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function TrackColumn({ title, items, icon }) {
  return (
    <div className="rounded-xl bg-slate-50/70 border border-slate-100 p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-3">
          {icon}
          <span>{title}</span>
        </div>

        <ul className="space-y-2">
          {items?.map((topic, i) => (
            <li
              key={i}
              className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed"
            >
              <span className="text-indigo-600 font-bold">•</span>
              <span>{topic}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default GroundedRoadmap
