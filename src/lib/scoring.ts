import type { FeatureDefinition, FeatureStatus } from '../types'

export function getFeatureScore(feature: FeatureDefinition): number {
  const signalAverage = feature.signals.reduce((total, value) => total + value, 0) / feature.signals.length
  return Math.round(feature.calculate(signalAverage) * 10) / 10
}

export function scoreToStatus(score: number): FeatureStatus {
  if (score >= 76) return 'healthy'
  if (score >= 48) return 'watch'
  return 'critical'
}

export function getSignalTrend(values: readonly number[]): number {
  const middle = Math.floor(values.length / 2)
  const first = values.slice(0, middle).reduce((sum, value) => sum + value, 0) / middle
  const secondValues = values.slice(middle)
  const second = secondValues.reduce((sum, value) => sum + value, 0) / secondValues.length
  return Math.round((second - first) * 10) / 10
}

