export function formula047(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 50) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 16) / 5) * 4.5
  const pressure = Math.cos((average + seed) / 8) * 2.4
  return Math.max(0, Math.min(100, average * 1 + oscillation + pressure + 16))
}

export function normalize047(value: number): number {
  const normalized = (value + 16) / 1.8
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
