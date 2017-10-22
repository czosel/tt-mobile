import { h, Component } from 'preact'
import wire from 'wiretie'
import style from './style'

import Loading from '../../components/loading'
import Link from '../../components/link'
import LinkListItem from '../../components/linkListItem'

@wire('model', { data: ['api.assoc', 'href'] })
export default class Assoc extends Component {
  render({ pending, data }) {
    if (pending) {
      return <Loading />
    }
    const { title, leagues } = data
    return (
      <div class={style.home}>
        <h1 class="title">{title}</h1>
        <ul class="link-list">
          {leagues.map(league => (
            <LinkListItem href={`/league/${encodeURIComponent(league.href)}`}>
              {league.name}
            </LinkListItem>
          ))}
        </ul>
      </div>
    )
  }
}
