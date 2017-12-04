import { h, Component } from 'preact'
import { Router, route } from 'preact-router'
import Helmet from 'preact-helmet'

// eslint-disable-next-line no-unused-vars
import debug from 'preact/debug'

import Provider from 'preact-context-provider'
import model from '../lib/model.js'

import Home from 'async!../routes/home'
import Assoc from 'async!../routes/assoc'
import AssocHistory from 'async!../routes/assoc-history'
import League from 'async!../routes/league'
import Club from 'async!../routes/club'
import Player from 'async!../routes/player'
import Game from 'async!../routes/game'
import About from 'async!../routes/about'

export default class App extends Component {
  model = model()

  history = []

  handleRoute = e => {
    this.history.push(e.previous)
  }

  goBack = () => {
    history.length ? history.back() : route('/')
  }

  render() {
    return (
      <Provider model={this.model}>
        <div id="app">
          <Helmet
            link={[
              {
                rel: 'apple-touch-icon',
                href: '/assets/apple-touch-icon.png'
              },
              {
                rel: 'icon',
                href: '/assets/favicon-32x32.png',
                sizes: '32x32'
              },
              {
                rel: 'icon',
                href: '/assets/favicon-16x16.png',
                sizes: '16x16'
              }
            ]}
            meta={[
              {
                name: 'msapplication-config',
                content: '/assets/browserconfig.xml'
              },
              { name: 'theme-color', content: '#FF5252' }
            ]}
          />
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <Assoc path="/assoc/:href" />
            <AssocHistory path="/assocHistory/:step" />
            <League path="/league/:href/:tab?" />
            <Club path="/club/:href" />
            <Player path="/player/:href/:tab?" back={this.goBack} />
            <Game path="/game/:href?" back={this.goBack} />
            <About path="/about" />
          </Router>
        </div>
      </Provider>
    )
  }
}
