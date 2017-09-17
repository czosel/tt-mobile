import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'

export default class Header extends Component {
  render({ href, children }) {
    return <a class={style.link} {...{ href, children }} />
  }
}
