import { h, Component } from 'preact'
import style from './style'

import clientHref from '../../lib/link'

import Header from '../../components/header'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <section class="section">
          <img src="/assets/logo.svg" class={style.logo} />
          <h2 class="subtitle">TT-mobile</h2>
          <p>von Christian Zosel</p>
          <p>
            Feedback?{' '}
            <a href="mailto:feedback@tt-mobile.ch">feedback@tt-mobile.ch</a>
          </p>
          <br />
          <p>
            TT-mobile ist Open Source (<a href="https://github.com/czosel/tt-mobile">
              GitHub
            </a>).
          </p>
        </section>
      </div>
    )
  }
}
