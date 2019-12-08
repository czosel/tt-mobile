import { Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'
import Match from 'preact-router/match'
import clientHref from '../../lib/link'

const baseUrl = 'http://click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa'

const getClickTTPath = path => {
  if (path.indexOf('/club/') > -1) {
    return path.replace('/club/', '/clubInfoDisplay?club=').slice(0, -1)
  }
  return decodeURIComponent(path.split('/').filter(s => s.includes('%2F'))[0])
}

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
            {back ? (
              <a class="navbar-item" onClick={back}>
                <strong>❮ Zurück</strong>
              </a>
            ) : breadcrumb ? (
              <Link class="navbar-item" href={clientHref(breadcrumb.href)}>
                <strong>❮ {breadcrumb.name}</strong>
              </Link>
            ) : !loading ? (
              <Link class="navbar-item" href="/">
                <h1>
                  <strong>
                    {location.pathname !== '/' && <span>❮ </span>}TT mobile
                  </strong>
                </h1>
              </Link>
            ) : (
              <span />
            )}
            <button
              onClick={this.toggleMenu}
              class={style.burger + ' navbar-burger ' + active}
              aria-label="menu"
              aria-expanded={menuOpen}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
          <div class={'navbar-menu ' + active}>
            <div class="navbar-end">
              <Link class="navbar-item" href="/search">
                Spielersuche
              </Link>
              <Match>
                {({ path }) => {
                  const clickTTPath = getClickTTPath(path)
                  return (
                    clickTTPath.length > 10 && (
                      <a
                        class="navbar-item"
                        target="_blank"
                        rel="noopener noreferrer"
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
