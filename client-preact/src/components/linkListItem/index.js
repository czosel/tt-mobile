import { h, Component } from 'preact'
import { route } from 'preact-router'
import style from './style'

export default class Header extends Component {
  onOpen = () => {
    route(this.props.href)
  }

  render({ href, children }) {
    return <li onClick={this.onOpen} {...{ href, children }} />
  }
}
