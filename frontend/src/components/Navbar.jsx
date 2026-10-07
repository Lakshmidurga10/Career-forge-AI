import { Sparkles } from "lucide-react"

function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-950 shadow-md">
            <Sparkles size={20} className="text-amber-400" />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              CareerForge AI
            </h1>
            <p className="text-xs font-medium text-slate-500">
              Intelligent Career & Resume Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            System Ready
          </span>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:inline text-slate-500">Resume → Match → Interview Prep</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
