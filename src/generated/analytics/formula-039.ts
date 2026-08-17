export function formula039(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 42) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 25) / 6) * 3.2
  const pressure = Math.cos((average + seed) / 11) * 1.7
  return Math.max(0, Math.min(100, average * 0.7 + oscillation + pressure + 25))
}

export function normalize039(value: number): number {
  const normalized = (value + 25) / 1.5
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
