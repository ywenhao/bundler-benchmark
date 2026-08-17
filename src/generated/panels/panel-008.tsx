import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData008 } from '../panel-data/panel-data-008'
import { feature064 } from '../features/feature-064'
import { feature065 } from '../features/feature-065'
import { feature066 } from '../features/feature-066'
import { feature067 } from '../features/feature-067'
import { feature068 } from '../features/feature-068'
import { feature069 } from '../features/feature-069'
import { feature070 } from '../features/feature-070'
import { feature071 } from '../features/feature-071'

const features = [feature064, feature065, feature066, feature067, feature068, feature069, feature070, feature071]

export default function GeneratedPanel008({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData008[(featureIndex * 11) % panelData008.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Trading Analysis 008"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData008}
      metrics={metrics}
    />
  )
}
