import { h, Component } from "preact";
import Helmet from "preact-helmet";
import wire from "wiretie";

import clientHref from "../../lib/link";

import Header from "../../components/header";
import Embed from "../../components/embed";
import Footer from "../../components/footer";
import Container from "../../components/container";
import LoadingPage from "../../components/loading-page";
import Loading from "../../components/loading";
import ErrorPage from "../../components/error-page";
import LinkRow from "../../components/link-row/";
import Table from "../../components/table";
import Schedule from "../../components/schedule";

import { API_ORIGIN } from "../../lib/model";

export default
@wire("model", {
  club: ["api.club", "id"],
  clubTeams: ["api.clubTeams", "id"],
})
class Club extends Component {
  render({ pending, rejected, back, club, clubTeams, id }) {
    if (pending && Object.keys(pending).length >= 2)
      return <LoadingPage back={back} />;
    if (rejected && Object.keys(rejected).length > 0)
      return <ErrorPage info={rejected} />;

    return (
      <div>
        <Header back={back} />
        <Container>
          {pending && pending.clubTeams ? (
            <Loading />
          ) : (
            <Teams {...clubTeams} />
          )}
          {pending && pending.club ? (
            <Loading />
          ) : (
            <div>
              <h2>Spielplan (Rückschau)</h2>
              <Schedule chunks={club && club.lastMatches} />
              <h2>Spielplan (Vorschau)</h2>
              <Schedule chunks={club && club.nextMatches} />
              <Embed param="club-id" url={id} />
            </div>
          )}
        </Container>
        <Footer />
      </div>
    );
  }
}

const Teams = ({ name, teams }) => (
  <div>
    <Helmet title={name} />
    <div class="logo-row mb-5">
      <img
        class="logo logo-lg is-pulled-left mr-3"
        src={`${API_ORIGIN}/logo/?name=${name}`}
      />
      <div>
        <h1 class="title">{name}</h1>
        <h2 class="subtitle">Mannschaften</h2>
      </div>
    </div>
    <Table>
      <thead>
        <tr>
          <th>Team</th>
          <th>Liga</th>
          <th class="center optional">Rang</th>
          <th class="center optional-2">Punkte</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {teams.map((team) => (
          <LinkRow key={team.href} href={clientHref(team.href)}>
            <td>{team.name}</td>
            <td>{team.league}</td>
            <td class="center optional">{team.rank}</td>
            <td class="center optional-2">{team.points}</td>
            <td class="thin">
              <i class="icon-right-open" />
            </td>
          </LinkRow>
        ))}
      </tbody>
    </Table>
  </div>
);
