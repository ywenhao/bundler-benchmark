export function formula029(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 32) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 0) / 5) * 3.6
  const pressure = Math.cos((average + seed) / 12) * 1.9
  return Math.max(0, Math.min(100, average * 0.8 + oscillation + pressure + 0))
}

export function normalize029(value: number): number {
  const normalized = (value + 0) / 1.6
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
