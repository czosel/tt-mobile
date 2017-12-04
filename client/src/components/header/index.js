import { Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'
import Match from 'preact-router/match'
import clientHref from '../../lib/link'

const baseUrl = 'http://click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa'

export default class Header extends Component {
  state = {
    menuOpen: false
  }

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  render({ breadcrumb, back, loading = false }, { menuOpen }) {
    const active = menuOpen ? 'is-active' : ''
    return (
      <nav
        class={style.fixed + ' navbar is-primary'}
        aria-label="main navigation"
      >
        <div class="container">
          <div class={style.truncate + ' navbar-brand'} id="navbar">
            {breadcrumb ? (
              <Link class="navbar-item" href={clientHref(breadcrumb.href)}>
                <strong>❮ {breadcrumb.name}</strong>
              </Link>
            ) : back ? (
              <a class="navbar-item" onClick={back}>
                <strong>❮ Zurück</strong>
              </a>
            ) : !loading ? (
              <Link class="navbar-item" href="/">
                <strong>
                  {location.pathname !== '/' && <span>❮ </span>}TT mobile
                </strong>
              </Link>
            ) : (
              <span />
            )}
            <button
              onClick={this.toggleMenu}
              class={style.burger + ' button navbar-burger ' + active}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
          <div class={'navbar-menu ' + active}>
            <div class="navbar-end">
              <Match>
                {({ path }) => {
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
                        In click-TT öffnen
                      </a>
                    )
                  )
                }}
              </Match>
              <Link class="navbar-item" href="/about">
                Über TT-mobile
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
