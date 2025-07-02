import { findIndex, reverse } from "rambda";

export const eloMin = [
  0, 630, 700, 780, 860, 930, 990, 1050, 1100, 1150, 1200, 1240, 1280, 1320,
  1360, 1410, 1470, 1540, 1630, 1730,
];

export function getClass(elo) {
  if (typeof elo !== "number") {
    return elo;
  }
  const i = eloMin.length - findIndex((e) => elo >= e, reverse(eloMin));
  return getLabel(i - 1);
}

export function getLabel(i) {
  const letters = ["D", "C", "B", "A"];
  return letters[Math.floor(i / 5)] + (i + 1);
}
