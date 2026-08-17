import { Suspense } from 'react'
import type { Density, PanelDefinition } from '../types'

interface PanelViewerProps {
  density: Density
  panel: PanelDefinition
}

export function PanelViewer({ density, panel }: PanelViewerProps) {
  const Panel = panel.component
  return (
    <Suspense fallback={<div className="panel-loading">Loading {panel.title}…</div>}>
      <Panel density={density} />
    </Suspense>
  )
}

