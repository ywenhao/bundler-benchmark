export function formula041(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 44) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 1) / 8) * 3.6
  const pressure = Math.cos((average + seed) / 13) * 1.9
  return Math.max(0, Math.min(100, average * 0.8 + oscillation + pressure + 1))
}

export function normalize041(value: number): number {
  const normalized = (value + 1) / 1.6
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
