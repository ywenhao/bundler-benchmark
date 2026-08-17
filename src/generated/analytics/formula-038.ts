export function formula038(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 41) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 8) / 5) * 5.4
  const pressure = Math.cos((average + seed) / 10) * 2.9
  return Math.max(0, Math.min(100, average * 1.2 + oscillation + pressure + 8))
}

export function normalize038(value: number): number {
  const normalized = (value + 8) / 2
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
