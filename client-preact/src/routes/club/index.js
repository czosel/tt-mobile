import { h, Component } from 'preact'
import wire from 'wiretie'

import Header from '../../components/header'
import LoadingPage from '../../components/loading-page'
import LinkRow from '../../components/linkRow/'
import Table from '../../components/table'
import EloScore from '../../components/elo-score'

@wire('model', { data: ['api.club', 'href'] })
export default class Club extends Component {
  render({ pending, data }) {
    if (pending) return <LoadingPage />

    const { players, name, league, breadcrumbs } = data
    return (
      <div>
        <Header breadcrumb={breadcrumbs[1]} />
        <section class="section">
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
        </section>
      </div>
    )
  }
}
