import { Activity, CircleDollarSign, Layers3, ShieldCheck } from 'lucide-react'
import type { FeatureDefinition } from '../types'
import { formatBudget, formatDecimal, formatInteger } from '../lib/format'
import { getFeatureScore } from '../lib/scoring'

interface SummaryStripProps {
  features: readonly FeatureDefinition[]
  totalCount: number
}

export function SummaryStrip({ features, totalCount }: SummaryStripProps) {
  const averageScore = features.length
    ? features.reduce((sum, feature) => sum + getFeatureScore(feature), 0) / features.length
    : 0
  const totalBudget = features.reduce((sum, feature) => sum + feature.budget, 0)
  const healthyCount = features.filter((feature) => feature.status === 'healthy').length

  const items = [
    { icon: Layers3, label: 'Visible workload', value: `${formatInteger(features.length)} / ${formatInteger(totalCount)}` },
    { icon: Activity, label: 'Average score', value: formatDecimal(averageScore) },
    { icon: CircleDollarSign, label: 'Tracked budget', value: formatBudget(totalBudget) },
    { icon: ShieldCheck, label: 'Healthy features', value: formatInteger(healthyCount) },
  ]

  return (
    <section className="summary-strip" aria-label="Filtered feature summary">
      {items.map(({ icon: Icon, label, value }) => (
        <div className="summary-item" key={label}>
          <Icon size={19} />
          <div><span>{label}</span><strong>{value}</strong></div>
        </div>
      ))}
    </section>
  )
}

