import { h, Component } from 'preact'
import style from './style'

const API_ORIGIN = 'http://localhost:3020'
const asJson = r => r.json()

export default class Profile extends Component {
  state = { title: 'test', clubs: [], games: [] }

  loadItems(href) {
    fetch(`${API_ORIGIN}/league?url=${encodeURIComponent(href)}`)
      .then(asJson)
      .then(data => this.setState(data))
  }

  componentDidMount() {
    this.loadItems(this.props.href)
  }

  render({}, { title }) {
    console.log('render', ...arguments)
    return (
      <div class={style.profile}>
        <h2>{title}</h2>
      </div>
    )
  }
}
