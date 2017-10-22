import { findIndex, gte, reverse } from 'ramda'

export const eloMin = [
  0,
  660,
  770,
  860,
  930,
  990,
  1040,
  1080,
  1120,
  1160,
  1200,
  1240,
  1280,
  1320,
  1360,
  1410,
  1470,
  1540,
  1630,
  1730
]

export function getClass(elo) {
  if (typeof elo !== 'number') {
    return elo
  }
  const i = eloMin.length - findIndex(gte(elo), reverse(eloMin))
  return getLabel(i - 1)
}

export function getLabel(i) {
  const letters = ['D', 'C', 'B', 'A']
  return letters[Math.floor(i / 5)] + (i + 1)
}
