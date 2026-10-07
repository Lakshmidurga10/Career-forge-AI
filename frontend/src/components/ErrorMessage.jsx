import { AlertCircle } from "lucide-react"

function ErrorMessage({ message, onRetry }) {
  if (!message) {
    return null
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider">
            Execution Warning
          </h3>
          <p className="mt-1 text-xs text-rose-700 leading-relaxed">
            {message}
          </p>

          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 rounded-lg bg-rose-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-rose-700 transition"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ErrorMessage
