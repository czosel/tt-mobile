import { h, Component } from "preact";
import style from "./style";

import Header from "../../components/header";
import Footer from "../../components/footer";
import Container from "../../components/container";

export default class Home extends Component {
  render({ back }) {
    return (
      <div>
        <Header back={back} />
        <Container>
          <div class="content">
            <img src="/assets/logo.svg" class={style.logo} />
            <h2>TT-mobile</h2>
            <p>von Christian Zosel</p>
            <p>
              E-Mail{" "}
              <a href="mailto:feedback@tt-mobile.ch">feedback@tt-mobile.ch</a>
              <br />
              Twitter{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/TTmobileCH"
              >
                @TTmobileCH
              </a>
            </p>
            <p>
              Code{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/czosel/tt-mobile"
              >
                GitHub
              </a>
            </p>
            <h3>Letzte Änderungen</h3>
            v1.1.1 (28.12.2020)
            <ul>
              <li>
                Bugfix: Clublogos wurden bei bestimmten Teams falsch dargestellt
              </li>
              <li>Softwarepflege</li>
            </ul>
            v1.1.0 (13.12.2020)
            <ul>
              <li>
                Feature: Clublogos
                <br />
                Falls das Falls das Logo deines Vereins noch fehlt, sende es
                bitte per Mail an{" "}
                <a href="mailto:feedback@tt-mobile.ch">feedback@tt-mobile.ch</a>
                .
              </li>
            </ul>
            v1.0.8 (24.10.2020)
            <ul>
              <li>Bugfix: Pokalspiele werden korrekt dargestellt</li>
            </ul>
            v1.0.7 (4.7.2020)
            <ul>
              <li>App für neue Spielsaison angepasst</li>
              <li>Softwarepflege</li>
            </ul>
            v1.0.6 (29.2.2020)
            <ul>
              <li>Spielplan-Vorschau auf Clubseite (Tobias Flühmann)</li>
              <li>
                Klassierung (aktuell) entspricht Vorberechnung Elo-Diagramm
              </li>
            </ul>
            v1.0.5 (26.12.2019)
            <ul>
              <li>TT-mobile kann auf Vereinswebsites eingebettet werden</li>
            </ul>
            v1.0.4 (8.12.2019)
            <ul>
              <li>Softwarepflege</li>
            </ul>
            v1.0.3 (29.8.2019)
            <ul>
              <li>Feature: Spielersuche</li>
              <li>Feature: Saisonwechsel auf Spielerseite möglich</li>
            </ul>
            v1.0.2 (12.8.2019)
            <ul>
              <li>App für neue Spielsaison angepasst</li>
            </ul>
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
    );
  }
}
