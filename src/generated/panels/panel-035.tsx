import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData035 } from '../panel-data/panel-data-035'
import { feature280 } from '../features/feature-280'
import { feature281 } from '../features/feature-281'
import { feature282 } from '../features/feature-282'
import { feature283 } from '../features/feature-283'
import { feature284 } from '../features/feature-284'
import { feature285 } from '../features/feature-285'
import { feature286 } from '../features/feature-286'
import { feature287 } from '../features/feature-287'

const features = [feature280, feature281, feature282, feature283, feature284, feature285, feature286, feature287]

export default function GeneratedPanel035({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData035[(featureIndex * 11) % panelData035.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Payments Analysis 035"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData035}
      metrics={metrics}
    />
  )
}
