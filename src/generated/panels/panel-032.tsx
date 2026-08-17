import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData032 } from '../panel-data/panel-data-032'
import { feature256 } from '../features/feature-256'
import { feature257 } from '../features/feature-257'
import { feature258 } from '../features/feature-258'
import { feature259 } from '../features/feature-259'
import { feature260 } from '../features/feature-260'
import { feature261 } from '../features/feature-261'
import { feature262 } from '../features/feature-262'
import { feature263 } from '../features/feature-263'

const features = [feature256, feature257, feature258, feature259, feature260, feature261, feature262, feature263]

export default function GeneratedPanel032({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData032[(featureIndex * 11) % panelData032.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Trading Analysis 032"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData032}
      metrics={metrics}
    />
  )
}
