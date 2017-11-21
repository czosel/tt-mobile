import { h, Component } from 'preact'
import wire from 'wiretie'
import style from './style'

import Header from '../../components/header'
import LoadingPage from '../../components/loading-page'
import Container from '../../components/container'
import LinkRow from '../../components/linkRow/'
import Table from '../../components/table'
import EloScore from '../../components/elo-score'

@wire('model', { data: ['api.game', 'href'] })
export default class Game extends Component {
  render({ pending, back, data }) {
    if (pending) return <LoadingPage />

    const {
      matches,
      breadcrumbs,
      summary,
      home,
      guest,
      assoc,
      league,
      date,
      time
    } = data
    return (
      <div>
        <Header back={back} />
        <Container>
          <h1 class="title">
            {home} - {guest}
          </h1>
          <h2 class="subtitle">{league}</h2>
          <Table>
            <thead>
              <tr>
                <th>
                  {home} / {guest}
                </th>
                <th>Klass.</th>
                <th class="center">Sätze</th>
                <th class="center">Spiele</th>
              </tr>
            </thead>
            <tbody>
              {matches.map(match => (
                <tr>
                  <td>
                    {match.player1}
                    <br />
                    {match.player2}
                  </td>
                  <td>
                    <EloScore value={match.player1class} />
                    <br />
                    <EloScore value={match.player2class} />
                  </td>
                  <td class="center">{match.sets}</td>
                  <td class="center">{match.game}</td>
                </tr>
              ))}
              <tr>
                <td colspan="2" />
                <td class="center">{summary.sets}</td>
                <td class="center">
                  <strong>{summary.game}</strong>
                </td>
              </tr>
            </tbody>
          </Table>
          <p>
            {date}, {time}
          </p>
        </Container>
      </div>
    )
  }
}
