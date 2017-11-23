import { h, Component } from 'preact'
import wire from 'wiretie'

import clientHref from '../../lib/link'

import Header from '../../components/header'
import Container from '../../components/container'
import LoadingPage from '../../components/loading-page'
import ErrorPage from '../../components/error-page'
import Link from '../../components/link'
import LinkListItem from '../../components/linkListItem'

@wire('model', { data: ['api.assocHistory', 'step'] })
export default class AssocHistory extends Component {
  render({ pending, rejected, data, step }) {
    if (pending) return <LoadingPage />
    if (rejected) return <ErrorPage info={rejected} />
    const { regular, trophy } = data
    return (
      <div>
        <Header />
        <Container>
          <ul class="link-list">
            {regular.map(league => (
              <LinkListItem href={clientHref(league.href)}>
                {league.name}
              </LinkListItem>
            ))}
          </ul>
        </Container>
      </div>
    )
  }
}
