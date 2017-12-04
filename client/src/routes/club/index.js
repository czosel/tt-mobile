import { h, Component } from 'preact'
import wire from 'wiretie'

import clientHref from '../../lib/link'

import Header from '../../components/header'
import Container from '../../components/container'
import LoadingPage from '../../components/loading-page'
import ErrorPage from '../../components/error-page'
import LinkRow from '../../components/link-row'
import Table from '../../components/table'
import EloScore from '../../components/elo-score'

@wire('model', { data: ['api.club', 'href'] })
export default class Club extends Component {
  render({ pending, rejected, data }) {
    if (pending) return <LoadingPage />
    if (rejected) return <ErrorPage info={rejected} />

    const { players, location, name, games, breadcrumbs } = data
    const link = 'https://maps.google.com/?q=' + location
    return (
      <div>
        <Header breadcrumb={breadcrumbs[1]} />
        <Container>
          <h1 class="title">{name}</h1>
          <p>
            <a href={link}>
              <i class="icon-location" style="font-size:1.5em" />
              {location}
            </a>
          </p>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th />
                <th class="center optional">Eins.</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {players.map(player => (
                <LinkRow
                  key={player.href}
                  href={`/player/${encodeURIComponent(player.href)}`}
                >
                  <td>{player.name}</td>
                  <td class="center thin">
                    <EloScore value={player.classification} />
                  </td>
                  <td class="center optional">{player.appearances}</td>
                  <td class="center">{player.balance}</td>
                  <td class="thin">
                    <i class="icon-right-open" />
                  </td>
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
                <th />
              </tr>
            </thead>
            <tbody>
              {games.map(({ href, date, opponent, isHome, result }) => (
                <LinkRow key={href} href={clientHref(href)}>
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
                  <td class="thin">
                    {result && <i class="icon-right-open" />}
                  </td>
                </LinkRow>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    )
  }
}
