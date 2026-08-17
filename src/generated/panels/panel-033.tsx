import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData033 } from '../panel-data/panel-data-033'
import { feature264 } from '../features/feature-264'
import { feature265 } from '../features/feature-265'
import { feature266 } from '../features/feature-266'
import { feature267 } from '../features/feature-267'
import { feature268 } from '../features/feature-268'
import { feature269 } from '../features/feature-269'
import { feature270 } from '../features/feature-270'
import { feature271 } from '../features/feature-271'

const features = [feature264, feature265, feature266, feature267, feature268, feature269, feature270, feature271]

export default function GeneratedPanel033({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData033[(featureIndex * 11) % panelData033.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Risk Analysis 033"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData033}
      metrics={metrics}
    />
  )
}
