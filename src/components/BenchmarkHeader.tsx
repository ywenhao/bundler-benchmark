import { Boxes, Gauge, GitBranch, PackageCheck } from 'lucide-react'

interface BenchmarkHeaderProps {
  featureCount: number
  moduleCount: number
  panelCount: number
}

export function BenchmarkHeader({ featureCount, moduleCount, panelCount }: BenchmarkHeaderProps) {
  return (
    <header className="app-header">
      <div className="brand-block">
        <div className="brand-mark" aria-hidden="true">
          <Gauge size={22} />
        </div>
        <div>
          <h1>Bundler Workload Dashboard</h1>
          <p>Shared React and TypeScript graph running on {__BUNDLER__}</p>
        </div>
      </div>
      <div className="header-stats" aria-label="Workload summary">
        <span><Boxes size={16} /> {featureCount} features</span>
        <span><GitBranch size={16} /> {moduleCount}+ modules</span>
        <span><PackageCheck size={16} /> {panelCount} lazy chunks</span>
      </div>
    </header>
  )
}

