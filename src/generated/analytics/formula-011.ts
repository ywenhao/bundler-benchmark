export function formula011(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 14) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 13) / 5) * 5
  const pressure = Math.cos((average + seed) / 5) * 2.6
  return Math.max(0, Math.min(100, average * 1.1 + oscillation + pressure + 13))
}

export function normalize011(value: number): number {
  const normalized = (value + 13) / 1.9
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
