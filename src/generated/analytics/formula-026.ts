export function formula026(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 29) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 7) / 11) * 3.2
  const pressure = Math.cos((average + seed) / 9) * 1.7
  return Math.max(0, Math.min(100, average * 0.7 + oscillation + pressure + 7))
}

export function normalize026(value: number): number {
  const normalized = (value + 7) / 1.5
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
