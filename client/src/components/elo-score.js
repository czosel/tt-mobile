import { getClass } from '../lib/elo'

const safeSplit = v => (v.split ? v.split('\n') : [v])
const safeTrim = v => (v.trim ? v.trim() : v)

const getStyle = value => {
  if (typeof value === 'number') {
    value = getClass(value)
  }
  const angle = parseInt(value.substr(1)) / 20 * 360 + 180
  return {
    'background-color': `hsl(${angle}, 100%, 40%)`,
    'font-weight': 'bold',
    color: 'white'
  }
}

export default function EloScore({ value }) {
  if (value === undefined || value === '-') {
    return
  }
  return (
    <span>
      {safeSplit(value)
        .map(safeTrim)
        .filter(v => !!v)
        .map((val, index) => (
          <span key={index} class="tag" style={getStyle(val)}>
            {getClass(val)}
          </span>
        ))}
    </span>
  )
}
