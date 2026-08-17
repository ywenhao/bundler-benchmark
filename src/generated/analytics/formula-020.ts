export function formula020(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 23) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 21) / 5) * 4.5
  const pressure = Math.cos((average + seed) / 14) * 2.4
  return Math.max(0, Math.min(100, average * 1 + oscillation + pressure + 21))
}

export function normalize020(value: number): number {
  const normalized = (value + 21) / 1.8
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
