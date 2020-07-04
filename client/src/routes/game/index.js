import { h, Component } from "preact";
import Helmet from "preact-helmet";
import wire from "wiretie";

import Header from "../../components/header";
import Footer from "../../components/footer";
import LoadingPage from "../../components/loading-page";
import ErrorPage from "../../components/error-page";
import Container from "../../components/container";
import Table from "../../components/table";
import EloScore from "../../components/elo-score";

export default
@wire("model", { data: ["api.game", "href"] })
class Game extends Component {
  render({ pending, rejected, back, data }) {
    if (pending) return <LoadingPage back={back} />;
    if (rejected) return <ErrorPage info={rejected} />;

    const { matches, summary, home, guest, league, date, time } = data;
    return (
      <div>
        <Helmet title={home + " - " + guest} />
        <Header back={back} />
        <Container>
          <h1 class="title">
            {home} - {guest}
          </h1>
          <h2 class="subtitle">{league}</h2>
          <Table>
            <thead>
              <tr>
                <th>
                  {home} / {guest}
                </th>
                <th>Klass.</th>
                <th class="center optional-4">1</th>
                <th class="center optional-4">2</th>
                <th class="center optional-4">3</th>
                <th class="center optional-4">4</th>
                <th class="center optional-4">5</th>
                <th class="center">Sätze</th>
                <th class="center">Spiele</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => (
                <tr key={index} class="no-hover">
                  <td>
                    <a
                      href={`/player/${encodeURIComponent(match.player1href)}`}
                    >
                      {match.player1}
                    </a>
                    <br />
                    <a
                      href={`/player/${encodeURIComponent(match.player2href)}`}
                    >
                      {match.player2}
                    </a>
                  </td>
                  <td>
                    <EloScore value={match.player1class} />
                    <br />
                    <EloScore value={match.player2class} />
                  </td>
                  <td class="center optional-4">{match.s1}</td>
                  <td class="center optional-4">{match.s2}</td>
                  <td class="center optional-4">{match.s3}</td>
                  <td class="center optional-4">{match.s4}</td>
                  <td class="center optional-4">{match.s5}</td>
                  <td class="center">{match.sets}</td>
                  <td class="center">{match.game}</td>
                </tr>
              ))}
              <tr class="no-hover">
                <td colSpan="2" />
                <td class="optional-4" colSpan="2" />
                <td class="right optional-4" colSpan="3">
                  {summary.balls}
                </td>
                <td class="center">{summary.sets}</td>
                <td class="center">
                  <strong>{summary.game}</strong>
                </td>
              </tr>
            </tbody>
          </Table>
          <p>
            {date}, {time}
          </p>
        </Container>
        <Footer />
      </div>
    );
  }
}
