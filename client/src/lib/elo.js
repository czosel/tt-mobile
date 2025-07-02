import { findIndex, reverse } from "rambda";

export const eloMin = [
  // D
  0, 630, 700, 780, 860,
  // C
  930, 990, 1050, 1100, 1150,
  // B
  1200, 1240, 1280, 1320, 1360,
  // A
  1410, 1470, 1540, 1630, 1730,
];

export const eloMinFemale = [
  // D
  0, 615, 630, 650, 675,
  // C
  700, 740, 790, 840, 890,
  // B
  930, 990, 1050, 1100, 1150,
  // A
  1200, 1240, 1320, 1360, 1410,
];

export function getClass(elo, gender = "m") {
  if (typeof elo !== "number") {
    return elo;
  }
  let femaleClassification = "";
  if (gender === "f") {
    femaleClassification = ` / ${getLabel(findClassIndex(elo, eloMinFemale))}`;
  }
  return getLabel(findClassIndex(elo, eloMin)) + femaleClassification;
}

function findClassIndex(elo, eloArray) {
  return eloArray.length - findIndex((e) => elo >= e, reverse(eloArray)) - 1;
}

export function getLabel(i) {
  const letters = ["D", "C", "B", "A"];
  return letters[Math.floor(i / 5)] + (i + 1);
}
