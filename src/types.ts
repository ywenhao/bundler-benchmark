import type { ComponentType, LazyExoticComponent } from 'react'

export type FeatureStatus = 'healthy' | 'watch' | 'critical'
export type FeaturePriority = 'P0' | 'P1' | 'P2' | 'P3'
export type Density = 'comfortable' | 'compact'
export type SortKey = 'score' | 'name' | 'budget' | 'complexity'

export interface FeatureDefinition {
  id: string
  name: string
  category: string
  owner: string
  status: FeatureStatus
  priority: FeaturePriority
  budget: number
  complexity: number
  updatedAt: string
  signals: readonly number[]
  calculate: (input: number) => number
}

export interface FilterState {
  query: string
  category: string
  status: FeatureStatus | 'all'
  sort: SortKey
}

export interface PanelProps {
  density: Density
}

export interface PanelDefinition {
  id: string
  title: string
  category: string
  component: LazyExoticComponent<ComponentType<PanelProps>>
}

export interface PanelMetric {
  label: string
  value: number
  status: FeatureStatus
}

