import { h, Component } from 'preact'
import style from './style'

import LinkRow from '../../components/linkRow/'
import Table from '../../components/table'

const API_ORIGIN = 'http://localhost:3020'
const asJson = r => r.json()

export default class League extends Component {
  state = { activeTab: 'table', assoc: '', league: '', clubs: [], games: [] }

  loadItems(href) {
    fetch(`${API_ORIGIN}/league?url=${encodeURIComponent(href)}`)
      .then(asJson)
      .then(data => this.setState(data))
  }

  componentDidMount() {
    this.loadItems(this.props.href)
  }

  setActiveTab(activeTab) {
    this.setState({ activeTab })
  }

  showTable = () => {
    this.setActiveTab('table')
  }

  showSchedule = () => {
    this.setActiveTab('schedule')
  }

  render({}, { activeTab, assoc, league, clubs, games }) {
    const content =
      activeTab === 'table' ? (
        <LeagueTable {...{ clubs }} />
      ) : (
        <LeagueSchedule {...{ games }} />
      )
    return (
      <div class={style.profile}>
        <div class="tabs is-toggle is-fullwidth">
          <ul>
            <li class={activeTab === 'table' ? 'is-active' : ''}>
              <a onClick={this.showTable}>Tabelle</a>
            </li>
            <li class={activeTab === 'schedule' ? 'is-active' : ''}>
              <a onClick={this.showSchedule}>Spielplan</a>
            </li>
          </ul>
        </div>
        <h1 class="title">{assoc}</h1>
        <h2 class="subtitle">{league}</h2>
        {content}
      </div>
    )
  }
}

function LeagueTable({ clubs }) {
  return (
    <Table>
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
          <LinkRow href={`/club/${encodeURIComponent(club.href)}`}>
            <td>{club.rank}</td>
            <td>{club.name}</td>
            <td>{club.nrOfGames}</td>
            <td>{club.score}</td>
          </LinkRow>
        ))}
      </tbody>
    </Table>
  )
}

function LeagueSchedule({ games }) {
  return (
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Datum</th>
          <th>Heim / Gast</th>
          <th>Spiele</th>
        </tr>
      </thead>
      <tbody>
        {games.map(game => (
          <tr>
            <td>{game.date}</td>
            <td>
              {game.home}
              <br />
              {game.guest}
            </td>
            <td>{game.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
