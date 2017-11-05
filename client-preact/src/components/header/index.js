import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'
import Match from 'preact-router/match'
import clientHref from '../../lib/link'

const baseUrl = 'http://click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa'

export default class Header extends Component {
  render({ breadcrumb, back, loading = false }) {
    return (
      <nav
        class={style.fixed + ' navbar is-primary'}
        aria-label="main navigation"
      >
        <div class={style.spread + ' navbar-brand'} id="navbar">
          {breadcrumb ? (
            <Link
              class="navbar-item"
              activeClassName="is-active"
              href={clientHref(breadcrumb.href)}
            >
              <strong>❮ {breadcrumb.name}</strong>
            </Link>
          ) : back ? (
            <a class="navbar-item" onClick={back}>
              <strong>❮ Zurück</strong>
            </a>
          ) : !loading ? (
            <Link class="navbar-item" activeClassName="is-active" href="/">
              <strong>TT mobile</strong>
            </Link>
          ) : (
            <span />
          )}
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
                    rel="noopener"
                    href={baseUrl + clickTTPath}
                  >
                    <img
                      src="/assets/icons/external-link.svg"
                      alt="external link"
                    />
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
