import { h, Component } from 'preact'
import wire from 'wiretie'
import style from './style'

import Loading from '../../components/loading'
import LinkRow from '../../components/linkRow/'
import Table from '../../components/table'
import EloScore from '../../components/elo-score'

@wire('model', { data: ['api.club', 'href'] })
export default class Club extends Component {
  render({ pending, data }) {
    if (pending) return <Loading />

    const { players, name, league } = data
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
