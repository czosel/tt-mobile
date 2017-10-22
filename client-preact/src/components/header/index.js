import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'
import Match from 'preact-router/match'

const baseUrl = 'http://click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa'

export default class Header extends Component {
  render({ clickTtUrl }) {
    return (
      <nav
        class={style.fixed + ' navbar is-primary'}
        role="navigation"
        aria-label="main navigation"
      >
        <div class={style.spread + ' navbar-brand'}>
          <Link class="navbar-item" activeClassName="is-active" href="/">
            <strong>TT mobile</strong>
          </Link>
          <Match>
            {({ matches, path }) => {
              const clickTTPath = decodeURIComponent(
                path.split('/').filter(s => s.includes('%2F'))[0]
              )
              return (
                clickTTPath.length > 10 && (
                  <a
                    class="navbar-item"
                    target="_blank"
                    href={baseUrl + clickTTPath}
                  >
                    <img src="/assets/icons/external-link.svg" />
                    &nbsp;click-tt
                  </a>
                )
              )
            }}
          </Match>
        </div>
      </nav>
    )
  }
}
