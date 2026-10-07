import { useState, useEffect } from "react"
import { Sparkles, MessageSquare, ArrowRight, RotateCcw, Award, Lightbulb, Target } from "lucide-react"
import { getNextInterviewQuestion } from "../services/api"

function InterviewSimulator({
  sessionId,
  candidate,
  job,
  analysis,
  interview,
  onEvaluate,
  onFinish,
}) {
  const allAvailableQuestions = [
    ...(interview?.technical || []),
    ...(interview?.project || []),
    ...(interview?.skill_gap || []),
    ...(interview?.behavioral || []),
    ...(interview?.hr || []),
  ]

  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [questionReason, setQuestionReason] = useState("")
  const [questionLoading, setQuestionLoading] = useState(false)

  const [answer, setAnswer] = useState("")
  const [evaluation, setEvaluation] = useState(null)
  const [turns, setTurns] = useState([])
  const [evaluating, setEvaluating] = useState(false)

  const loadNextQuestion = async (existingTurns = turns) => {
    setQuestionLoading(true)

    // Max 5 questions per adaptive session
    if (existingTurns.length >= 5) {
      onFinish(existingTurns)
      setQuestionLoading(false)
      return
    }

    try {
      // If we are in demo mode without real backend connection
      const askedSet = new Set(existingTurns.map((t) => t.question.question))
      const remaining = allAvailableQuestions.filter((q) => !askedSet.has(q.question))

      if (remaining.length === 0) {
        onFinish(existingTurns)
        return
      }

      const result = await getNextInterviewQuestion(
        sessionId || "default_session",
        candidate,
        job,
        analysis,
        allAvailableQuestions
      )

      if (result.status === "complete" || !result.question) {
        onFinish(existingTurns)
        return
      }

      setCurrentQuestion(result.question)
      setQuestionReason(result.reason || "Selected to assess role-specific competencies.")
    } catch (err) {
      // Local fallback in case of network variance
      const askedSet = new Set(existingTurns.map((t) => t.question.question))
      const remaining = allAvailableQuestions.filter((q) => !askedSet.has(q.question))

      if (remaining.length > 0) {
        setCurrentQuestion(remaining[0])
        setQuestionReason(`Testing ${remaining[0].category} competency and core role expectations.`)
      } else {
        onFinish(existingTurns)
      }
    } finally {
      setQuestionLoading(false)
    }
  }

  useEffect(() => {
    loadNextQuestion([])
  }, [])

  const handleSubmit = async () => {
    if (!answer.trim() || !currentQuestion) return

    setEvaluating(true)

    try {
      const result = await onEvaluate(
        currentQuestion,
        answer,
        turns
      )

      const evalData = result.evaluation || result

      const turn = {
        question: currentQuestion,
        answer,
        evaluation: evalData,
      }

      const updatedTurns = [...turns, turn]
      setTurns(updatedTurns)
      setEvaluation(evalData)
    } catch (err) {
      console.error("Evaluation error:", err)
    } finally {
      setEvaluating(false)
    }
  }

  const handleNext = async () => {
    setAnswer("")
    setEvaluation(null)
    await loadNextQuestion(turns)
  }

  if (questionLoading && !currentQuestion) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm space-y-3">
        <Sparkles size={28} className="animate-spin text-indigo-600 mx-auto" />
        <p className="text-sm font-bold text-slate-800">Adaptive AI Engine selecting next question...</p>
        <p className="text-xs text-slate-500">Analyzing job criteria and prior response signals</p>
      </div>
    )
  }

  if (!currentQuestion) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 border border-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700 uppercase">
                <Target size={12} /> Adaptive Engine Active
              </span>
            </div>

            <h2 className="mt-1.5 text-xl font-black text-slate-900">
              {job?.job_title || "Technical Interview"} • {job?.company || "Target Role"}
            </h2>
          </div>

          <span className="rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold text-slate-700 w-fit">
            Question {turns.length + 1} of 5
          </span>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100 border border-slate-200/60">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-500"
            style={{
              width: `${((turns.length + 1) / 5) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
            {currentQuestion.category}
          </span>

          <span className="rounded-md bg-indigo-50 border border-indigo-100 px-2.5 py-1 text-[11px] font-bold text-indigo-700">
            {currentQuestion.difficulty}
          </span>

          {currentQuestion.skill && (
            <span className="rounded-md bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
              Skill: {currentQuestion.skill}
            </span>
          )}

          {currentQuestion.project && (
            <span className="rounded-md bg-violet-50 border border-violet-100 px-2.5 py-1 text-[11px] font-bold text-violet-700">
              Project: {currentQuestion.project}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 leading-relaxed">
          {currentQuestion.question}
        </h3>

        {/* AI Strategy Reason Note */}
        {questionReason && (
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 flex items-start gap-2.5">
            <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                AI Interview Strategy
              </p>
              <p className="text-xs text-slate-600 font-medium mt-0.5 leading-relaxed">
                {questionReason}
              </p>
            </div>
          </div>
        )}

        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Type your response here using concrete technical details and structured reasoning..."
          className="min-h-36 w-full rounded-xl border border-slate-200 p-4 text-xs leading-relaxed text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50 transition"
          disabled={evaluation !== null}
        />

        {!evaluation && (
          <button
            onClick={handleSubmit}
            disabled={evaluating || !answer.trim()}
            className="rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold text-white shadow hover:bg-slate-800 disabled:opacity-50 transition flex items-center gap-2"
          >
            {evaluating ? (
              <>
                <Sparkles size={14} className="animate-spin text-amber-400" />
                AI Evaluating Answer...
              </>
            ) : (
              <>
                Submit Answer for AI Review <ArrowRight size={14} />
              </>
            )}
          </button>
        )}
      </div>

      {/* Real-time Multi-Dimensional Evaluation */}
      {evaluation && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <ScoreCard
              label="Technical Accuracy"
              value={evaluation.technical_score ?? evaluation.score ?? 75}
            />

            <ScoreCard
              label="Communication Clarity"
              value={evaluation.communication_score ?? 80}
            />

            <ScoreCard
              label="Response Relevance"
              value={evaluation.relevance_score ?? 85}
            />

            <ScoreCard
              label="Overall Score"
              value={evaluation.overall_score ?? evaluation.score ?? 80}
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm space-y-5">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                AI Evaluator Feedback
              </h4>

              <p className="mt-2 text-xs leading-relaxed text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                {evaluation.feedback}
              </p>
            </div>

            {evaluation.improved_answer && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Recommended Industry-Standard Response
                </h4>

                <p className="mt-2 rounded-xl bg-indigo-50/60 border border-indigo-100 p-4 text-xs leading-relaxed text-slate-800">
                  {evaluation.improved_answer}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={questionLoading}
            className="rounded-xl bg-slate-900 px-7 py-3.5 text-xs font-bold text-white shadow hover:bg-slate-800 transition flex items-center gap-2"
          >
            {questionLoading ? (
              <>
                <Sparkles size={14} className="animate-spin text-amber-400" />
                Loading Next Adaptive Question...
              </>
            ) : turns.length >= 4 ? (
              "Generate Full Interview Report →"
            ) : (
              "Proceed to Next Adaptive Question →"
            )}
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
        {Math.round(value)}
      </p>

      <p className="text-[10px] text-slate-400 font-medium">
        / 100 points
      </p>
    </div>
  )
}

export default InterviewSimulator
