import { h, Component } from 'preact'
import wire from 'wiretie'
import { route } from 'preact-router'
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
  handleChange = tab => {
    route(`/league/${encodeURIComponent(this.props.href)}/${tab}`)
  }

  render({ pending, data, tab }) {
    if (pending) return <Loading />

    const { assoc, league, clubs, games } = data

    tab = clubs.length === 0 ? 'schedule' : tab || 'table'

    const content =
      tab === 'table' ? (
        <LeagueTable {...{ clubs }} />
      ) : (
        <LeagueSchedule {...{ games }} />
      )
    return (
      <div class={style.profile}>
        {clubs.length > 0 ? (
          <Tabs active={tab} onChange={this.handleChange}>
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
        {games.map(data => {
          return data.href ? <Link {...data} /> : <Row {...data} />
        })}
      </tbody>
    </table>
  )
}

function Row({ date, home, guest, result }) {
  return (
    <tr>
      <td>{date}</td>
      <td>
        {home}
        <br />
        {guest}
      </td>
      <td>{result}</td>
    </tr>
  )
}

function Link({ href, date, home, guest, result }) {
  return (
    <LinkRow href={`/game/${encodeURIComponent(href)}`}>
      <td>{date}</td>
      <td>
        {home}
        <br />
        {guest}
      </td>
      <td>{result}</td>
    </LinkRow>
  )
}
