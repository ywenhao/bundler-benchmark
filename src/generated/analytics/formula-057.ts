export function formula057(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 60) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 12) / 6) * 4.1
  const pressure = Math.cos((average + seed) / 7) * 2.2
  return Math.max(0, Math.min(100, average * 0.9 + oscillation + pressure + 12))
}

export function normalize057(value: number): number {
  const normalized = (value + 12) / 1.7
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
