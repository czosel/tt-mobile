import { h, Component } from 'preact'
import { route } from 'preact-router'
import style from './style'

export default class LinkListItem extends Component {
  onOpen = () => {
    route(this.props.href)
  }

  render({ children }) {
    return <li class={style.row} onClick={this.onOpen} {...{ children }} />
  }
}
