import { h, Component } from 'preact'
import style from './style'
import Link from '../../components/link'

const API_ORIGIN = 'http://localhost:3020'
const asJson = r => r.json()

export default class Profile extends Component {
  state = { assoc: '', league: '', clubs: [], games: [] }

  loadItems(href) {
    fetch(`${API_ORIGIN}/league?url=${encodeURIComponent(href)}`)
      .then(asJson)
      .then(data => this.setState(data))
  }

  componentDidMount() {
    this.loadItems(this.props.href)
  }

  render({}, { assoc, league, clubs }) {
    console.log('render', ...arguments)
    return (
      <div class={style.profile}>
        <h2 class="subtitle">
          {assoc}
          <br />
          {league}
        </h2>
        <div class="tabs is-toggle is-fullwidth">
          <ul>
            <li class="is-active">
              <a>Tabelle</a>
            </li>
            <li>
              <a>Spielplan</a>
            </li>
          </ul>
        </div>
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Rang</th>
              <th>Mannschaft</th>
              <th>Beg.</th>
              <th>Punkte</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map(club => (
              <tr>
                <td>{club.rank}</td>
                <td>{club.name}</td>
                <td>{club.nrOfGames}</td>
                <td>{club.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
