import { h, Component } from 'preact'
import style from './style'

import LinkRow from '../../components/linkRow/'
import Table from '../../components/table'
import EloScore from '../../components/elo-score'

const API_ORIGIN = 'http://localhost:3020'
const asJson = r => r.json()

export default class Club extends Component {
  state = { players: [], name: '', league: '' }

  loadItems(href) {
    fetch(`${API_ORIGIN}/club?url=${encodeURIComponent(href)}`)
      .then(asJson)
      .then(data => this.setState(data))
  }

  componentDidMount() {
    this.loadItems(this.props.href)
  }

  render({}, { players, name, league }) {
    return (
      <div>
        <h1 class="title">{league}</h1>
        <h2 class="subtitle">{name}</h2>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Klass.</th>
              <th>Eins.</th>
              <th>Bilanz</th>
            </tr>
          </thead>
          <tbody>
            {players.map(player => (
              <LinkRow href={`/player/${encodeURIComponent(player.href)}`}>
                <td>{player.name}</td>
                <td>
                  <EloScore value={player.classification} />
                </td>
                <td>{player.appearances}</td>
                <td>{player.balance}</td>
              </LinkRow>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}
