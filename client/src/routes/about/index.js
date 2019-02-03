import { h, Component } from 'preact'
import style from './style'

import Header from '../../components/header'
import Footer from '../../components/footer'
import Container from '../../components/container'

export default class Home extends Component {
  render({ back }) {
    return (
      <div>
        <Header back={back} />
        <Container>
          <div class="content">
            <img src="/assets/logo.svg" class={style.logo} />
            <h2>TT-mobile</h2>
            <p>
              von Christian Zosel
              <br />
              Feedback?{' '}
              <a href="mailto:feedback@tt-mobile.ch">feedback@tt-mobile.ch</a>
            </p>
            <p>
              TT-mobile ist Open Source (
              <a href="https://github.com/czosel/tt-mobile">GitHub</a>).
            </p>
            <h3>Letzte Änderungen</h3>
            v1.0.1 (3.2.2019)
            <ul>
              <li>
                Bugfix: Fehler in Elo-Vorschau behoben, der durch
                Elo-Korrekturen im Protokoll ausgelöst wurde
              </li>
              <li>
                Bugfix: Footer wird nicht mehr auf Ladebildschirm angezeigt
              </li>
            </ul>
            v1.0.0 (28.1.2019)
            <ul>
              <li>
                Feature: Elo-Diagramm berechnet auch Vorschau aus Elo-Filter
              </li>
              <li>
                Bugfix: Querformat funktioniert auch auf Android-Geräten, wenn
                App auf Homescreen verlinkt
              </li>
            </ul>
          </div>
        </Container>
        <Footer />
      </div>
    )
  }
}
