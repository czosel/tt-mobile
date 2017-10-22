import { h, Component } from 'preact'
import { Router } from 'preact-router'

import debug from 'preact/debug'

import Provider from 'preact-context-provider'
import model from '../lib/model.js'

import Header from './header'
import Home from 'async!../routes/home'
import Assoc from 'async!../routes/assoc'
import AssocHistory from 'async!../routes/assoc-history'
import League from 'async!../routes/league'
import Club from 'async!../routes/club'
import Player from 'async!../routes/player'
import Game from 'async!../routes/game'

export default class App extends Component {
  model = model()

  render() {
    return (
      <Provider model={this.model}>
        <div id="app">
          <Header />
          <section class="section">
            <Router>
              <Home path="/" />
              <Assoc path="/assoc/:href" />
              <AssocHistory path="/assocHistory/:step" />
              <League path="/league/:href/:tab?" />
              <Club path="/club/:href" />
              <Player path="/player/:href/:tab?" />
              <Game path="/game/:href" />
            </Router>
          </section>
        </div>
      </Provider>
    )
  }
}
