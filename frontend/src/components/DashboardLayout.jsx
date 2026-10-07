function DashboardLayout({
  children,
  activeSection,
  setActiveSection,
}) {
  const navigation = [
    { id: "overview", label: "Overview", icon: "⌂" },
    { id: "resume", label: "Resume AI", icon: "▣" },
    { id: "match", label: "Job Match", icon: "◎" },
    { id: "skills", label: "Skill Gap", icon: "◆" },
    { id: "interview", label: "Interview", icon: "🎙" },
    { id: "career", label: "Career AI", icon: "✦" },
    { id: "explainability", label: "Why This Score", icon: "ℹ" },
    { id: "roadmap", label: "Roadmap", icon: "→" },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Horizontal Navigation */}
      <div className="overflow-x-auto border-b bg-white lg:hidden sticky top-0 z-40">
        <div className="flex min-w-max gap-2 p-3">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                activeSection === item.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden min-h-screen w-64 shrink-0 border-r bg-white lg:block sticky top-0 self-start">
          <div className="border-b px-6 py-5">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              CareerForge AI
            </h1>
            <p className="text-xs font-medium text-slate-500">
              AI Career Intelligence
            </p>
          </div>

          <nav className="space-y-1 p-4">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  activeSection === item.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Workspace */}
        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
