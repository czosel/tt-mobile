import { h, Component } from 'preact'
import wire from 'wiretie'

import clientHref from '../../lib/link'

import Header from '../../components/header'
import Container from '../../components/container'
import CardList from '../../components/card-list'
import LoadingPage from '../../components/loading-page'
import ErrorPage from '../../components/error-page'

const hrefify = e => ({ ...e, href: clientHref(e.href) })

export default
@wire('model', { data: ['api.assocHistory', 'step'] })
class AssocHistory extends Component {
  render({ pending, rejected, data }) {
    if (pending) return <LoadingPage />
    if (rejected) return <ErrorPage info={rejected} />
    const { regular, trophy } = data
    return (
      <div>
        <Header />
        <Container>
          <CardList name="Punktspiele" content={regular.map(hrefify)} />
          <br />
          <CardList name="Pokalspiele" content={trophy.map(hrefify)} />
        </Container>
      </div>
    )
  }
}
