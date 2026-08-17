import type { Density, PanelMetric } from '../types'
import { formatDecimal } from '../lib/format'

interface PanelFrameProps {
  density: Density
  title: string
  subtitle: string
  series: readonly number[]
  metrics: readonly PanelMetric[]
}

export function PanelFrame({ density, title, subtitle, series, metrics }: PanelFrameProps) {
  const max = Math.max(...series, 1)
  return (
    <section className={`panel-frame ${density}`}>
      <header><div><h3>{title}</h3><p>{subtitle}</p></div><span>Lazy-loaded panel</span></header>
      <div className="panel-chart" aria-label={`${title} chart`}>
        {series.slice(-48).map((value, index) => (
          <i key={`${index}-${value}`} style={{ height: `${Math.max(5, (value / max) * 100)}%` }} />
        ))}
      </div>
      <div className="panel-metrics">
        {metrics.map((metric) => (
          <div key={metric.label}><span>{metric.label}</span><strong>{formatDecimal(metric.value)}</strong><i className={metric.status} /></div>
        ))}
      </div>
    </section>
  )
}

