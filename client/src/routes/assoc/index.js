import { h, Component } from 'preact'
import Helmet from 'preact-helmet'
import wire from 'wiretie'
import style from './style'

import Header from '../../components/header'
import Footer from '../../components/footer'
import Container from '../../components/container'
import LoadingPage from '../../components/loading-page'
import ErrorPage from '../../components/error-page'
import Table from '../../components/table'
import LinkRow from '../../components/link-row'

export default
@wire('model', { data: ['api.assoc', 'href'] })
class Assoc extends Component {
  render({ pending, rejected, back, data }) {
    if (pending) return <LoadingPage back={back} />
    if (rejected) return <ErrorPage info={rejected} />
    const { title, leagues } = data
    return (
      <div class={style.home}>
        <Helmet title={title} />
        <Header back={back} />
        <Container>
          <h1 class="title">{title}</h1>
          <h2 class="subtitle">
            <a href="/">TT-mobile</a>
          </h2>
          <Table>
            <tbody>
              {leagues.map(league => (
                <LinkRow
                  key={league.href}
                  href={`/league/${encodeURIComponent(league.href)}`}
                >
                  <td>{league.name}</td>
                  <td class="thin">
                    <i class="icon-right-open" />
                  </td>
                </LinkRow>
              ))}
            </tbody>
          </Table>
        </Container>
        <Footer />
      </div>
    )
  }
}
