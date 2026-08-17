import { ArrowUpRight } from 'lucide-react'
import type { Density, FeatureDefinition } from '../types'
import { formatBudget, formatDecimal, formatRelativeDate } from '../lib/format'
import { getFeatureScore, getSignalTrend } from '../lib/scoring'
import { SignalBars } from './SignalBars'

interface FeatureTableProps {
  density: Density
  features: readonly FeatureDefinition[]
  onInspect: (feature: FeatureDefinition) => void
}

export function FeatureTable({ density, features, onInspect }: FeatureTableProps) {
  return (
    <div className={`table-shell ${density}`}>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Status</th>
            <th>Signals</th>
            <th>Score</th>
            <th>Budget</th>
            <th>Updated</th>
            <th><span className="sr-only">Inspect</span></th>
          </tr>
        </thead>
        <tbody>
          {features.slice(0, 90).map((feature) => {
            const score = getFeatureScore(feature)
            const trend = getSignalTrend(feature.signals)
            return (
              <tr key={feature.id}>
                <td>
                  <strong>{feature.name}</strong>
                  <span>{feature.id} · {feature.owner} · {feature.priority}</span>
                </td>
                <td><span className={`status-pill ${feature.status}`}>{feature.status}</span></td>
                <td><SignalBars values={feature.signals} /></td>
                <td><strong>{formatDecimal(score)}</strong><span className={trend >= 0 ? 'positive' : 'negative'}>{trend >= 0 ? '+' : ''}{trend}</span></td>
                <td>{formatBudget(feature.budget)}</td>
                <td>{formatRelativeDate(feature.updatedAt)}</td>
                <td><button className="icon-button" title={`Inspect ${feature.name}`} onClick={() => onInspect(feature)}><ArrowUpRight size={17} /></button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {features.length > 90 && <p className="table-note">Showing the first 90 of {features.length} matching features.</p>}
    </div>
  )
}

