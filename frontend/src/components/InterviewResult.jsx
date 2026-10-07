function QuestionCard({ question }) {
  const difficultyColor =
    question.difficulty?.toLowerCase() === "easy"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : question.difficulty?.toLowerCase() === "hard"
      ? "bg-rose-50 text-rose-700 border-rose-200"
      : "bg-amber-50 text-amber-700 border-amber-200"

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition">
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-semibold text-slate-800 leading-relaxed">
          {question.question}
        </p>

        <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold capitalize ${difficultyColor}`}>
          {question.difficulty || "medium"}
        </span>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-2 text-[11px]">
        {question.skill && (
          <span className="rounded bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
            🎯 Target Skill: {question.skill}
          </span>
        )}

        {question.project && (
          <span className="rounded bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
            📂 Project: {question.project}
          </span>
        )}
      </div>
    </div>
  )
}

function InterviewSection({ title, questions, badgeColor = "bg-slate-100 text-slate-700" }) {
  if (!questions || questions.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-bold text-slate-900">
          {title}
        </h3>
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${badgeColor}`}>
          {questions.length}
        </span>
      </div>

      <div className="space-y-2.5">
        {questions.map((question, index) => (
          <QuestionCard key={index} question={question} />
        ))}
      </div>
    </div>
  )
}

function InterviewResult({ interview }) {
  if (!interview) {
    return null
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            🎯 Role-Specific Interview Preparation
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Curated questions across technical mastery, candidate projects, skill gaps, and behavioral readiness
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <InterviewSection
          title="Technical & Coding Questions"
          questions={interview.technical}
          badgeColor="bg-indigo-50 text-indigo-700"
        />

        <InterviewSection
          title="Project Deep-Dive Questions"
          questions={interview.project}
          badgeColor="bg-violet-50 text-violet-700"
        />

        <InterviewSection
          title="Skill-Gap Probing Questions"
          questions={interview.skill_gap}
          badgeColor="bg-rose-50 text-rose-700"
        />

        <InterviewSection
          title="Behavioral & Situational Questions"
          questions={interview.behavioral}
          badgeColor="bg-amber-50 text-amber-700"
        />

        <InterviewSection
          title="HR & Role Alignment Questions"
          questions={interview.hr}
          badgeColor="bg-slate-100 text-slate-700"
        />
      </div>
    </div>
  )
}

export default InterviewResult
