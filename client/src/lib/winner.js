export function winnerClass(sets, invert) {
  const [me, opp] = sets.split(':').map(s => parseInt(s, 10))
  if ([me, opp].filter(Number.isInteger).length < 2) {
    return ''
  }
  if (me == opp) {
    return 'tie'
  }
  return (me > opp) ^ invert ? 'win' : 'loose'
}
