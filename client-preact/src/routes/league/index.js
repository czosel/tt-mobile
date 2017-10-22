import { h, Component } from 'preact'
import wire from 'wiretie'
import style from './style'

import Loading from '../../components/loading'
import LinkRow from '../../components/linkRow/'
import Table from '../../components/table'
import Tabs from '../../components/tabs'
import Tab from '../../components/tab'

const API_ORIGIN = 'http://localhost:3020'
const asJson = r => r.json()

@wire('model', { data: ['api.league', 'href'] })
export default class League extends Component {
  state = { activeTab: 'table' }

  handleChange = activeTab => {
    this.setState({ activeTab })
  }

  render({ pending, data }, { activeTab }) {
    if (pending) return <Loading />

    const { assoc, league, clubs, games } = data
    if (clubs.length === 0) {
      activeTab = 'schedule'
    }
    const content =
      activeTab === 'table' ? (
        <LeagueTable {...{ clubs }} />
      ) : (
        <LeagueSchedule {...{ games }} />
      )
    return (
      <div class={style.profile}>
        {clubs.length > 0 ? (
          <Tabs active={activeTab} onChange={this.handleChange}>
            <Tab name="table">Tabelle</Tab>
            <Tab name="schedule">Spielplan</Tab>
          </Tabs>
        ) : (
          <span />
        )}
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
