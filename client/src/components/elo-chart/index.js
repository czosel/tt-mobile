import { createElement as h } from 'preact/compat'
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
  join
} from 'rambda'

import { eloMin, getLabel } from '../../lib/elo'

const max = arr => Math.max(...arr)
const min = arr => Math.min(...arr)

const shrink = multiply(0.98)
const grow = multiply(1.02)

const x1 = pipe(
  map(head),
  min
)
const x2 = pipe(
  map(head),
  max
)
const y1 = pipe(
  map(last),
  min,
  shrink
)
const y2 = pipe(
  map(last),
  max,
  grow
)
const dx = p => subtract(x2(p), x1(p))
const dy = p => subtract(y2(p), y1(p))

const [vx1, vx2, vy1, vy2] = [30, 300, 0, 200]
const vdy = vy2 - vy1
const vdx = vx2 - vx1

const projectX = curry((x, points) => (x * vdx) / dx(points) + vx1)
const projectY = curry((y, points) => {
  return Math.round(vy2 - (((y - y1(points)) * vdy) / dy(points) + vy1))
})

// returns the projection function based on current data
const project = curry((points, [x, y]) => [
  projectX(x, points),
  projectY(y, points)
])

const asString = compose(
  join(','),
  map(join(','))
)

export default function EloChart({ data = [], startDate, endDate }) {
  if (!data || !data.length) {
    return
  }
  const dataToPoints = addIndex(map)((y, i) => [i, y])
  const points = dataToPoints(data)
  const process = map(project(points))

  const view = compose(
    asString,
    process
  )(points)
  const projectLines = map(({ label, y }) => ({
    label,
    pos: projectY(y, points)
  }))
  let lines = eloMin.map((min, i) => ({
    label: getLabel(i),
    y: min
  }))
  lines = projectLines(lines)
  /* eslint-disable react/jsx-key */
  return (
    <svg width="100%" height="200px" viewBox="0 0 300 200" class="chart">
      {lines
        .filter(({ pos }) => pos > 0 && pos < 190)
        .map(({ pos, label }) => (
          <text
            x="20"
            y={pos < 6 ? 10 : pos + 4}
            textAnchor="end"
            fontSize="12"
            fill="grey"
          >
            {label}
          </text>
        ))}
      {lines
        .filter(({ pos }) => pos > 0 && pos < 190)
        .map(({ pos }) => (
          <line
            x1="25"
            y1={pos}
            x2="300"
            y2={pos}
            strokeWidth="1"
            stroke="#757575"
          />
        ))}
      <polyline fill="none" stroke="#FF5252" strokeWidth="3" points={view} />
      <text x="25" y="200" fontSize="12" fill="grey">
        {startDate}
      </text>
      <text textAnchor="end" x="300" y="200" fontSize="12" fill="grey">
        {endDate}
      </text>
    </svg>
  )
}
