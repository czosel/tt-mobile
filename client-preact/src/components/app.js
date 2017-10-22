import { h, Component } from 'preact'
import { Router } from 'preact-router'

import debug from 'preact/debug'

import Provider from 'preact-context-provider'
import Header from './header'
import Home from '../routes/home'
import Assoc from '../routes/assoc'
import League from '../routes/league'
import Club from '../routes/club'
import Player from '../routes/player'
import Game from '../routes/game'

import model from '../lib/model.js'
// import Home from 'async!./home';
// import Profile from 'async!./profile';

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
