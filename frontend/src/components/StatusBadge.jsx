function StatusBadge({ status }) {
  const styles = {
    ready: "bg-emerald-50 text-emerald-700 border-emerald-200",
    analyzing: "bg-amber-50 text-amber-700 border-amber-200",
    error: "bg-rose-50 text-rose-700 border-rose-200",
  }

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
        styles[status] || styles.ready
      }`}
    >
      {status}
    </span>
  )
}

export default StatusBadge
