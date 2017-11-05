import { h, Component } from 'preact'
import { Router, route } from 'preact-router'

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

export default class App extends Component {
  model = model()

  history = []

  handleRoute = e => {
    this.history.push(e.previous)
    console.log('handled Route', e, this.history)
  }

  goBack = () => {
    history.length ? history.back() : route('/')
  }

  render() {
    return (
      <Provider model={this.model}>
        <div id="app">
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <Assoc path="/assoc/:href" />
            <AssocHistory path="/assocHistory/:step" />
            <League path="/league/:href/:tab?" />
            <Club path="/club/:href" />
            <Player path="/player/:href/:tab?" back={this.goBack} />
            <Game path="/game/:href" />
          </Router>
        </div>
      </Provider>
    )
  }
}
