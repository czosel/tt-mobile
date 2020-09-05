import { h, Component } from "preact";
import Helmet from "preact-helmet";
import wire from "wiretie";

import clientHref from "../../lib/link";
import { icalHref } from "../../lib/model";

import Header from "../../components/header";
import Embed from "../../components/embed";
import Footer from "../../components/footer";
import Container from "../../components/container";
import LoadingPage from "../../components/loading-page";
import ErrorPage from "../../components/error-page";
import LinkRow from "../../components/link-row";
import Table from "../../components/table";
import EloScore from "../../components/elo-score";

import { API_ORIGIN } from "../../lib/model";

export default
@wire("model", { data: ["api.team", "href"] })
class Team extends Component {
  render({ pending, rejected, back, data, href }) {
    if (pending) return <LoadingPage back={back} />;
    if (rejected) return <ErrorPage info={rejected} />;

    const { club, clubId, players, location, name, games, breadcrumbs } = data;
    const link = "https://maps.google.com/?q=" + location;
    return (
      <div>
        <Helmet title={name} />
        <Header breadcrumb={breadcrumbs[1]} back={back} />
        <Container>
          <div class="logo-row">
            <img
              class="logo logo-lg is-pulled-left mr-3"
              src={`${API_ORIGIN}/logo/?name=${club}`}
            />
            <div>
              <h1 class="title">{name}</h1>
              <h2 class="subtitle">
                <a href={clientHref(breadcrumbs[1].href)}>
                  {breadcrumbs[1].name}
                </a>
              </h2>
            </div>
          </div>
          <p class="mt-2">
            <a href={link}>
              <i class="icon-location" style="font-size:1.5em" />
              {location}
            </a>
          </p>
          {players.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <th />
                  <th />
                  <th class="center optional">Eins.</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <LinkRow
                    key={player.href}
                    href={`/player/${encodeURIComponent(player.href)}`}
                  >
                    <td>{player.name}</td>
                    <td class="center thin">
                      <EloScore value={player.classification} />
                    </td>
                    <td class="center optional">{player.appearances}</td>
                    <td class="center">{player.balance}</td>
                    <td class="thin">
                      <i class="icon-right-open" />
                    </td>
                  </LinkRow>
                ))}
              </tbody>
            </Table>
          )}
          <Embed param="team-url" url={href} />
          <Table>
            <tbody>
              <LinkRow href={clientHref({ clubId })}>
                <td>Weitere Mannschaften von {club}</td>
                <td class="thin">
                  <i class="icon-right-open" />
                </td>
              </LinkRow>
            </tbody>
          </Table>
          <a
            href={icalHref(href)}
            target="_blank"
            rel="noopener noreferrer"
            class="button is-small is-pulled-right"
          >
            Zum Kalender hinzufügen
          </a>
          <h2 class="subtitle">Spielplan</h2>
          <Table>
            <thead>
              <tr>
                <th>Gegner</th>
                <th>Spiele</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {games.map(({ href, date, time, opponent, isHome, result }) => (
                <LinkRow key={href} href={clientHref(href)}>
                  <td>
                    {opponent}
                    <div class="tags has-addons">
                      {isHome ? (
                        <span class="tag is-success">Zuhause</span>
                      ) : (
                        <span class="tag is-warning">Auswärts</span>
                      )}
                      <span class="tag">
                        {date}, {time}
                      </span>
                    </div>
                  </td>
                  <td class="result center">{result || "-:-"}</td>
                  <td class="thin">
                    {result && <i class="icon-right-open" />}
                  </td>
                </LinkRow>
              ))}
            </tbody>
          </Table>
        </Container>
        <Footer />
      </div>
    );
  }
}
