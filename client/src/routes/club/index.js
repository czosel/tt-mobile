import { h, Component } from 'preact'
import wire from 'wiretie'

import clientHref from '../../lib/link'

import Header from '../../components/header'
import Container from '../../components/container'
import LoadingPage from '../../components/loading-page'
import ErrorPage from '../../components/error-page'
import Schedule from '../../components/schedule'
import LinkRow from '../../components/linkRow'
import Table from '../../components/table'
import EloScore from '../../components/elo-score'

@wire('model', { data: ['api.club', 'href'] })
export default class Club extends Component {
  render({ pending, rejected, data }) {
    if (pending) return <LoadingPage />
    if (rejected) return <ErrorPage info={rejected} />

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
                  <td class="center">{player.balance}</td>
                </LinkRow>
              ))}
            </tbody>
          </Table>
          <h2 class="subtitle">Spielplan</h2>
          <Table>
            <thead>
              <tr>
                <th>Gegner</th>
                <th>Spiele</th>
              </tr>
            </thead>
            <tbody>
              {games.map(({ href, date, opponent, isHome, result }) => (
                <LinkRow href={clientHref(href)}>
                  <td>
                    {opponent}
                    <div class="tags has-addons">
                      {isHome ? (
                        <span class="tag is-success">Zuhause</span>
                      ) : (
                        <span class="tag is-warning">Auswärts</span>
                      )}
                      <span class="tag">{date}</span>
                    </div>
                  </td>
                  <td class="result center">{result || '-:-'}</td>
                </LinkRow>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    )
  }
}
