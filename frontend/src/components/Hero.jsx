import { Sparkles, ArrowRight, ShieldCheck, Target, Award, Play } from "lucide-react"

function Hero({ onStart, onDemo }) {
  return (
    <section className="border-b border-slate-200 bg-white py-20 px-6">
      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-xs font-bold text-indigo-700 shadow-sm">
          <Sparkles size={14} className="text-amber-500" />
          CareerForge AI • AI Career Intelligence Workspace
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-tight">
          Turn your resume into a{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            career strategy.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 font-medium">
          Analyze any job, discover your skill gaps, build a targeted resume, and prepare for the interview — with one AI-powered career workspace.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-xs font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition"
          >
            Start Career Analysis <ArrowRight size={15} />
          </button>

          <button
            onClick={onDemo}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition"
          >
            <Play size={14} className="text-indigo-600" />
            🚀 Try Demo
          </button>
        </div>

        {/* 3 Value Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left border-t border-slate-100 pt-10">
          <div className="rounded-2xl p-5 bg-slate-50 border border-slate-200/80 shadow-sm">
            <span className="text-[11px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">01</span>
            <h3 className="text-sm font-bold text-slate-900 mt-2">Match</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Understand your job compatibility with explainable multi-signal scoring.</p>
          </div>

          <div className="rounded-2xl p-5 bg-slate-50 border border-slate-200/80 shadow-sm">
            <span className="text-[11px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">02</span>
            <h3 className="text-sm font-bold text-slate-900 mt-2">Improve</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Discover exactly what you're missing and prioritize actionable skill gaps.</p>
          </div>

          <div className="rounded-2xl p-5 bg-slate-50 border border-slate-200/80 shadow-sm">
            <span className="text-[11px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">03</span>
            <h3 className="text-sm font-bold text-slate-900 mt-2">Prepare</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Generate targeted ATS PDF resumes and practice evaluated mock interviews.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
