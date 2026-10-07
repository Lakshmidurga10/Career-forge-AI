const steps = [
  "Resume Upload",
  "Target Job",
  "Career Analysis",
  "Tailored Resume",
  "Mock Interview",
]

function WorkflowSteps({ currentStep }) {
  return (
    <div className="mx-auto mb-10 flex max-w-4xl items-center justify-between px-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const completed = stepNumber < currentStep
        const active = stepNumber === currentStep

        return (
          <div key={step} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={[
                  "flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition-all shadow-sm",
                  completed
                    ? "bg-emerald-600 text-white"
                    : active
                    ? "bg-indigo-600 text-white shadow-indigo-200"
                    : "bg-slate-200 text-slate-500"
                ].join(" ")}
              >
                {completed ? "✓" : stepNumber}
              </div>

              <span className={`mt-2 hidden text-[11px] font-semibold tracking-tight sm:block ${active ? 'text-indigo-600' : 'text-slate-500'}`}>
                {step}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className={`mx-2 h-0.5 flex-1 rounded ${completed ? 'bg-emerald-500' : 'bg-slate-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default WorkflowSteps
