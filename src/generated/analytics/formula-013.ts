export function formula013(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 16) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 18) / 7) * 3.2
  const pressure = Math.cos((average + seed) / 7) * 1.7
  return Math.max(0, Math.min(100, average * 0.7 + oscillation + pressure + 18))
}

export function normalize013(value: number): number {
  const normalized = (value + 18) / 1.5
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
