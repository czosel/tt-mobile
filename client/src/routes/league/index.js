import { h, Component } from 'preact'
import wire from 'wiretie'
import { route } from 'preact-router'
import style from './style'

import clientHref from '../../lib/link'

import Header from '../../components/header'
import Container from '../../components/container'
import Schedule from '../../components/schedule'
import LoadingPage from '../../components/loading-page'
import ErrorPage from '../../components/error-page'
import LinkRow from '../../components/link-row/'
import Table from '../../components/table'
import Tabs from '../../components/tabs'
import Tab from '../../components/tab'

@wire('model', { data: ['api.league', 'href'] })
export default class League extends Component {
  handleChange = tab => {
    route(clientHref(this.props.href, tab))
  }

  render({ pending, rejected, data, tab }) {
    if (pending) return <LoadingPage />
    if (rejected) return <ErrorPage info={rejected} />

    const { league, clubs, chunks, breadcrumbs } = data

    tab = clubs.length === 0 ? 'schedule' : tab || 'table'

    const content =
      tab === 'table' ? (
        <LeagueTable {...{ clubs }} />
      ) : (
        <Schedule {...{ chunks }} />
      )
    return (
      <div class={style.profile}>
        <Header breadcrumb={breadcrumbs[0]} />
        <Container>
          {clubs.length > 0 ? (
            <Tabs active={tab} onChange={this.handleChange}>
              <Tab name="table">Tabelle</Tab>
              <Tab name="schedule">Spielplan</Tab>
            </Tabs>
          ) : (
            <span />
          )}
          <h1 class="title">{league}</h1>
          {content}
        </Container>
      </div>
    )
  }
}

function LeagueTable({ clubs }) {
  return (
    <Table>
      <thead>
        <tr>
          <th />
          <th>Mannschaft</th>
          <th class="center optional">Beg.</th>
          <th>Punkte</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {clubs.map(club => (
          <LinkRow key={club.href} href={clientHref(club.href)}>
            <td class="right thin">{club.rank}</td>
            <td>{club.name}</td>
            <td class="center optional">{club.nrOfGames}</td>
            <td class="result center">{club.score}</td>
            <td class="thin">
              <i class="icon-right-open" />
            </td>
          </LinkRow>
        ))}
      </tbody>
    </Table>
  )
}
