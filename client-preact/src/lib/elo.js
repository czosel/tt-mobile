import * as R from 'ramda'

export default {
  eloMin: [
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
  ],

  getClass(elo) {
    const i =
      this.eloMin.length - R.findIndex(R.gte(elo), R.reverse(this.eloMin))
    return this.getLabel(i - 1)
  },

  getLabel(i) {
    const letters = ['D', 'C', 'B', 'A']
    return letters[Math.floor(i / 5)] + (i + 1)
  }
}
