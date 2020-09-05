import { h, Component } from "preact";
import Helmet from "preact-helmet";
import wire from "wiretie";

import clientHref from "../../lib/link";

import Header from "../../components/header";
import Footer from "../../components/footer";
import Container from "../../components/container";
import LoadingPage from "../../components/loading-page";
import Loading from "../../components/loading";
import ErrorPage from "../../components/error-page";
import LinkRow from "../../components/link-row/";
import Table from "../../components/table";
import Schedule from "../../components/schedule";

function stripProtocol(url) {
  return url.replace(/(^\w+:|^)\/\//, "");
}

export default
@wire("model", {
  club: ["api.club", "id"],
  clubTeams: ["api.clubTeams", "id"],
})
class Club extends Component {
  render({ pending, rejected, back, club, clubTeams }) {
    if (pending && Object.keys(pending).length >= 2)
      return <LoadingPage back={back} />;
    if (rejected && Object.keys(rejected).length > 0)
      return <ErrorPage info={rejected} />;

    return (
      <div>
        <Header back={back} />
        <Container>
          {pending || !club ? (
            <Loading />
          ) : (
            <div>
              <Helmet title={name} />
              <h1 class="title">{club.name}</h1>
              <p class="mb-5">
                {club.contact.name}
                <br />
                <a href={"mailto:" + club.contact.email}>
                  {club.contact.email}
                </a>
                <br />
                <a href={club.contact.website} target="_blank">
                  {stripProtocol(club.contact.website)}
                </a>
              </p>
              <h2 class="subtitle">Mannschaften</h2>
              <Teams {...clubTeams} />
              <h2 class="subtitle">Spielplan (Rückschau)</h2>
              <Schedule chunks={club.lastMatches} />
              <h2 class="subtitle">Spielplan (Vorschau)</h2>
              <Schedule chunks={club.nextMatches} />
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
