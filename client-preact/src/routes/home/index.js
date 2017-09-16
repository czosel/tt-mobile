import { h, Component } from 'preact'
import style from './style'

const API_ORIGIN = 'http://localhost:3020'

const asJson = r => r.json()

export default class Home extends Component {
  state = { title: '', leagues: [] }

  loadItems() {
    fetch(
      `${API_ORIGIN}/assoc?url=%2Fcgi-bin%2FWebObjects%2FnuLigaTTCH.woa%2Fwa%2FleaguePage%3Fchampionship%3DMTTV%2B17%252F18`
    )
      .then(asJson)
      .then(data => this.setState(data))
  }

  componentDidMount() {
    this.loadItems()
  }

  render({}, { title, leagues }) {
    return (
      <div class={style.home}>
        <ul>{leagues.map(league => <li>{league.name}</li>)}</ul>
      </div>
    )
  }
}
