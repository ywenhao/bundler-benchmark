export function formula044(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 47) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 23) / 11) * 4.1
  const pressure = Math.cos((average + seed) / 5) * 2.2
  return Math.max(0, Math.min(100, average * 0.9 + oscillation + pressure + 23))
}

export function normalize044(value: number): number {
  const normalized = (value + 23) / 1.7
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
