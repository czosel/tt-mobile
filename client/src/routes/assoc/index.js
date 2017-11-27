import { h, Component } from 'preact'
import wire from 'wiretie'
import style from './style'

import Header from '../../components/header'
import Container from '../../components/container'
import LoadingPage from '../../components/loading-page'
import ErrorPage from '../../components/error-page'
import Table from '../../components/table'
import LinkRow from '../../components/link-row'

@wire('model', { data: ['api.assoc', 'href'] })
export default class Assoc extends Component {
  render({ pending, rejected, data }) {
    if (pending) return <LoadingPage />
    if (rejected) return <ErrorPage info={rejected} />
    const { title, leagues } = data
    return (
      <div class={style.home}>
        <Header />
        <Container>
          <h1 class="title">{title}</h1>
          <Table>
            <tbody>
              {leagues.map(league => (
                <LinkRow href={`/league/${encodeURIComponent(league.href)}`}>
                  <td>{league.name}</td>
                  <td class="thin">
                    <i class="icon-right-open" />
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
