import { Component, Input } from '@angular/core';
import * as R from 'ramda'
import { Elo } from '../../providers/elo'

const max = arr => Math.max(...arr)
const min = arr => Math.min(...arr)

const shrink = R.multiply(0.98)
const grow = R.multiply(1.02)

const x1 = R.pipe(R.map(R.head), min)
const x2 = R.pipe(R.map(R.head), max)
const y1 = R.pipe(R.map(R.last), min, shrink)
const y2 = R.pipe(R.map(R.last), max, grow)
const dx = R.converge(R.subtract, [x2, x1])
const dy = R.converge(R.subtract, [y2, y1])

const [vx1, vx2, vy1, vy2] = [30, 300, 0, 200]
const vdy = vy2 - vy1
const vdx = vx2 - vx1

const projectX = R.curry((x, points) => x * vdx / dx(points) + vx1)
const projectY = R.curry((y, points) => {
  return Math.round(vy2 - ((y - y1(points)) * vdy / dy(points) + vy1))
})

// returns the projection function based on current data
const project = R.curry((points, [x, y]) => ([
  projectX(x, points),
  projectY(y, points)
]))

const dataToPoints = R.addIndex(R.map)((y, i) => [i, y])
const asString = R.compose(R.join(','), R.map(R.join(',')))

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
    const process = R.map(project(points))

    this.view = R.compose(asString, process)(points)

    const projectLines = R.map(({label, y}) => ({
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
