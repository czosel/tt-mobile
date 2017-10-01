import { h, Component } from 'preact'
import {
  multiply,
  pipe,
  map,
  head,
  last,
  subtract,
  compose,
  curry,
  addIndex,
  join,
  converge
} from 'ramda'

import elo from '../../lib/elo'

const max = arr => Math.max(...arr)
const min = arr => Math.min(...arr)

const shrink = multiply(0.98)
const grow = multiply(1.02)

const x1 = pipe(map(head), min)
const x2 = pipe(map(head), max)
const y1 = pipe(map(last), min, shrink)
const y2 = pipe(map(last), max, grow)
const dx = converge(subtract, [x2, x1])
const dy = converge(subtract, [y2, y1])

const [vx1, vx2, vy1, vy2] = [30, 300, 0, 200]
const vdy = vy2 - vy1
const vdx = vx2 - vx1

const projectX = curry((x, points) => x * vdx / dx(points) + vx1)
const projectY = curry((y, points) => {
  return Math.round(vy2 - ((y - y1(points)) * vdy / dy(points) + vy1))
})

// returns the projection function based on current data
const project = curry((points, [x, y]) => [
  projectX(x, points),
  projectY(y, points)
])

const dataToPoints = addIndex(map)((y, i) => [i, y])
const asString = compose(join(','), map(join(',')))

const getLabel = i => {
  const letters = ['A', 'B', 'C', 'D'].reverse()
  return letters[Math.floor(i / 5)] + (i + 1)
}

export default function EloChart({ data = [] }) {
  if (!data || !data.length) {
    return
  }
  const points = dataToPoints(data)
  const process = map(project(points))

  const view = compose(asString, process)(points)
  const projectLines = map(({ label, y }) => ({
    label,
    pos: projectY(y, points)
  }))
  let lines = elo.eloMin.map((min, i) => ({
    label: elo.getLabel(i),
    y: min
  }))
  lines = projectLines(lines)
  return (
    <svg width="100%" height="200px" viewBox="0 0 300 200" class="chart">
      {lines.map(line => (
        <text x="0" y={line.pos + 4} font-size="12" fill="grey">
          {line.label}
        </text>
      ))}
      {lines.map(line => (
        <line
          x1="25"
          y1={line.pos}
          x2="300"
          y2={line.pos}
          strokeWidth="1"
          stroke="#757575"
        />
      ))}
      <polyline fill="none" stroke="#FF5252" stroke-width="3" points={view} />
    </svg>
  )
}
