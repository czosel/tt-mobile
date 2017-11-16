import { h, Component } from 'preact'
import wire from 'wiretie'
import style from './style'

import Header from '../../components/header'
import Container from '../../components/container'
import LoadingPage from '../../components/loading-page'
import Link from '../../components/link'
import LinkListItem from '../../components/linkListItem'

@wire('model', { data: ['api.assoc', 'href'] })
export default class Assoc extends Component {
  render({ pending, data }) {
    if (pending) {
      return <LoadingPage />
    }
    const { title, leagues } = data
    return (
      <div class={style.home}>
        <Header />
        <Container>
          <h1 class="title">{title}</h1>
          <ul class="link-list">
            {leagues.map(league => (
              <LinkListItem href={`/league/${encodeURIComponent(league.href)}`}>
                {league.name}
              </LinkListItem>
            ))}
          </ul>
        </Container>
      </div>
    )
  }
}
