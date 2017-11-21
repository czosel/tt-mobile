import { h, Component } from 'preact'
import wire from 'wiretie'

import clientHref from '../../lib/link'

import Header from '../../components/header'
import Container from '../../components/container'
import LoadingPage from '../../components/loading-page'
import Schedule from '../../components/schedule'
import LinkRow from '../../components/linkRow'
import Table from '../../components/table'
import EloScore from '../../components/elo-score'

@wire('model', { data: ['api.club', 'href'] })
export default class Club extends Component {
  render({ pending, data }) {
    if (pending) return <LoadingPage />

    const { players, name, league, games, breadcrumbs } = data
    return (
      <div>
        <Header breadcrumb={breadcrumbs[1]} />
        <Container>
          <h1 class="title">{name}</h1>
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
          <h2 class="subtitle">Spielplan</h2>
          <Schedule games={games} />
        </Container>
      </div>
    )
  }
}
