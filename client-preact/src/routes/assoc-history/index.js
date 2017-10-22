import { h, Component } from 'preact'
import wire from 'wiretie'
import style from './style'

import Loading from '../../components/loading'
import Link from '../../components/link'
import LinkListItem from '../../components/linkListItem'

@wire('model', { data: ['api.assocHistory', 'step'] })
export default class AssocHistory extends Component {
  render({ pending, data, step }) {
    console.log('render AssocHistory', pending, data, step)
    if (pending) {
      return <Loading />
    }
    const { regular, trophy } = data
    return (
      <div class={style.home}>
        <ul class="link-list">
          {regular.map(league => (
            <LinkListItem href={`/assoc/${encodeURIComponent(league.href)}`}>
              {league.name}
            </LinkListItem>
          ))}
        </ul>
      </div>
    )
  }
}
