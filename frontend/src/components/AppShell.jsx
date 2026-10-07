function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-950 text-white font-black text-base shadow">
              CF
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-slate-900 leading-none">
                CareerForge AI
              </h1>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                AI-powered career intelligence
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-6 text-xs font-semibold text-slate-600 md:flex">
            <span className="hover:text-slate-900 cursor-pointer transition">Resume Parser</span>
            <span className="hover:text-slate-900 cursor-pointer transition">Job Match</span>
            <span className="hover:text-slate-900 cursor-pointer transition">Skill Gap</span>
            <span className="hover:text-slate-900 cursor-pointer transition">ATS Resume</span>
            <span className="hover:text-slate-900 cursor-pointer transition">Interview AI</span>
          </div>
        </div>
      </header>

      <main>
        {children}
      </main>
    </div>
  )
}

export default AppShell
