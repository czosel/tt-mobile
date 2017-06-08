import { Component, Input } from '@angular/core';
import { multiply, pipe, map, head, last, subtract, compose, curry, addIndex, join, converge }  from 'ramda'
import { Elo } from '../../providers/elo'

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
const project = curry((points, [x, y]) => ([
  projectX(x, points),
  projectY(y, points)
]))

const dataToPoints = addIndex(map)((y, i) => [i, y])
const asString = compose(join(','), map(join(',')))

const getLabel = i => {
  const letters = ['A', 'B', 'C', 'D'].reverse()
  return letters[Math.floor(i/5)] + (i + 1)
}

@Component({
  selector: 'elo-chart',
  templateUrl: 'elo-chart.html'
})
export class EloChartComponent {
  view
  lines

  constructor(public elo: Elo) {}

  @Input()
  set data(data) {
    if (!data || !data.length) {
      return
    }
    const points = dataToPoints(data)
    const process = map(project(points))

    this.view = compose(asString, process)(points)

    const projectLines = map(({label, y}) => ({
      label,
      pos: projectY(y, points)
    }))
    const lines = this.elo.eloMin.map((min, i) => ({
      label: getLabel(i),
      y: min
    }))
    this.lines = projectLines(lines)
  }

}
