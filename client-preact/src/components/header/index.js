import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'

export default class Header extends Component {
  render() {
    return (
      <nav
        class={style.fixed + ' navbar is-primary'}
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <Link class="navbar-item" activeClassName="is-active" href="/">
            <strong>TT mobile</strong>
          </Link>
          {/*<Link
            class="navbar-item"
            activeClassName="is-active"
            href="/profile"
          >
            Me
          </Link>*/}
        </div>
      </nav>
    )
  }
}
