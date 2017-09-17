import { h, Component } from 'preact'
import { Router } from 'preact-router'

import debug from 'preact/debug'

import Header from './header'
import Home from '../routes/home'
import League from '../routes/league'
// import Home from 'async!./home';
// import Profile from 'async!./profile';

export default class App extends Component {
  /** Gets fired when the route changes.
   * @param {Object} event     "change" event from [preact-router](http://git.io/preact-router)
   * @param {string} event.url The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url
  }

  render() {
    return (
      <div id="app">
        <Header />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <League path="/league/:href" />
        </Router>
      </div>
    )
  }
}