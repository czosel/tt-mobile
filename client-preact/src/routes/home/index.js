import { h, Component } from 'preact'
import style from './style'

import Link from '../../components/link'

const API_ORIGIN = 'http://localhost:3020'

const asJson = r => r.json()

export default class Home extends Component {
  state = { title: '', leagues: [] }

  loadItems() {
    fetch(
      `${API_ORIGIN}/assoc?url=leaguePage%3Fchampionship%3DMTTV%2B17%252F18`
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
        <ul>
          {leagues.map(league => (
            <li>
              <Link href={`league/${encodeURIComponent(league.href)}`}>
                {league.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
