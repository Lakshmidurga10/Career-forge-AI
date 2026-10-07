import { useState } from "react"
import { evaluateInterviewAnswer } from "../services/api"
import { Mic, CheckCircle2, AlertTriangle, Sparkles, ArrowRight, Loader2, Award } from "lucide-react"

function InterviewPractice({ questions }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState("")
  const [evaluation, setEvaluation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [scores, setScores] = useState([])

  if (!questions || questions.length === 0) {
    return null
  }

  const currentQuestion = questions[currentIndex]

  const handleSubmit = async () => {
    if (!answer.trim()) {
      return
    }

    try {
      setLoading(true)
      const response = await evaluateInterviewAnswer(
        currentQuestion,
        answer
      )

      setEvaluation(response.evaluation)
      setScores([...scores, response.evaluation.score])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1)
    setAnswer("")
    setEvaluation(null)
  }

  const finished = currentIndex >= questions.length - 1

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Mic size={22} className="text-indigo-600" />
            Interactive Mock Interview Simulator
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Real-time answer evaluation with instant scoring, feedback, and optimized responses
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold text-slate-700">
          Question {currentIndex + 1} of {questions.length}
        </span>
      </div>

      {/* Question Prompt */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 p-6 text-white shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-100">
            {currentQuestion.category}
          </span>
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium capitalize text-slate-200">
            Difficulty: {currentQuestion.difficulty}
          </span>
          {currentQuestion.skill && (
            <span className="rounded-full bg-indigo-500/30 border border-indigo-400/30 px-2.5 py-0.5 text-[10px] font-medium text-indigo-200">
              Focus: {currentQuestion.skill}
            </span>
          )}
        </div>

        <p className="text-base sm:text-lg font-semibold leading-snug">
          "{currentQuestion.question}"
        </p>
      </div>

      {/* Answer Input */}
      <div className="mt-5">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Formulate your response as you would in a live interview..."
          disabled={!!evaluation || loading}
          className="min-h-36 w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-xs leading-relaxed text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:bg-white disabled:opacity-80 transition"
        />

        {!evaluation && (
          <button
            onClick={handleSubmit}
            disabled={loading || !answer.trim()}
            className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 px-6 text-xs font-bold text-white shadow hover:bg-slate-800 disabled:opacity-50 transition"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                AI Evaluator analyzing your response...
              </>
            ) : (
              "Submit Answer for AI Evaluation"
            )}
          </button>
        )}
      </div>

      {/* AI Evaluation Card */}
      {evaluation && (
        <div className="mt-6 space-y-5 rounded-2xl border border-indigo-100 bg-indigo-50/20 p-6">
          {/* Score header */}
          <div className="flex items-center justify-between border-b border-indigo-100 pb-4">
            <div className="flex items-center gap-2">
              <Award size={20} className="text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Evaluation & Performance Insights
              </h3>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500">Score:</span>
              <span className="text-2xl font-black text-indigo-900">
                {evaluation.score}
              </span>
              <span className="text-xs text-slate-400">/100</span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Strengths */}
            <div className="rounded-xl bg-white border border-emerald-100 p-4">
              <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                <CheckCircle2 size={14} /> Key Strengths
              </h4>
              <ul className="space-y-1 text-xs text-slate-700">
                {evaluation.strengths.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="rounded-xl bg-white border border-amber-100 p-4">
              <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
                <AlertTriangle size={14} /> Areas to Polish
              </h4>
              <ul className="space-y-1 text-xs text-slate-700">
                {evaluation.weaknesses.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Feedback */}
          <div className="rounded-xl bg-white border border-indigo-100 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-1.5">
              Interviewer Feedback
            </h4>
            <p className="text-xs leading-relaxed text-slate-700">
              {evaluation.feedback}
            </p>
          </div>

          {/* Example Stronger Answer */}
          <div className="rounded-xl bg-slate-900 p-5 text-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-amber-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Benchmark Answer Example
              </h4>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              {evaluation.improved_answer}
            </p>
          </div>

          {!finished ? (
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 px-6 text-xs font-bold text-white shadow hover:bg-indigo-700 transition"
            >
              Proceed to Next Question <ArrowRight size={16} />
            </button>
          ) : (
            <div className="rounded-xl bg-emerald-100/70 p-4 text-center text-xs font-bold text-emerald-900">
              🎉 Mock Interview Session Complete! Average Score: {Math.round(scores.reduce((a, b) => a + b, 0) / (scores.length || 1))}/100
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default InterviewPractice
