interface SignalBarsProps {
  values: readonly number[]
}

export function SignalBars({ values }: SignalBarsProps) {
  const max = Math.max(...values, 1)
  return (
    <span className="signal-bars" aria-label={`Signal values ${values.join(', ')}`}>
      {values.slice(-10).map((value, index) => (
        <i key={`${index}-${value}`} style={{ height: `${Math.max(12, (value / max) * 100)}%` }} />
      ))}
    </span>
  )
}

