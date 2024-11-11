import { Component } from "preact";
import wire from "wiretie";

import clientHref from "../../lib/link";

import Header from "../../components/header";
import Footer from "../../components/footer";
import Container from "../../components/container";
import CardList from "../../components/card-list";
import Card from "../../components/card";
import LinkRow from "../../components/link-row/";
import LoadingPage from "../../components/loading-page";
import ErrorPage from "../../components/error-page";
import Table from "../../components/table";

const spaceToPlus = (str) => str.replace(" ", "+");

const seasons = [
  "22/23",
  "21/22",
  "20/21",
  "19/20",
  "18/19",
  "17/18",
  "16/17",
  "15/16",
  "14/15",
  "13/14",
  "12/13",
];

const history = seasons.map((year, step) => ({
  name: `Saison 20${year}`,
  href: `/assocHistory/${encodeURIComponent(step)}`,
}));

const assocNames = [
  "STT",
  "AGTT",
  "ANJTT",
  "ATTT",
  "AVVF",
  "MTTV",
  "NWTTV",
  "OTTV",
  "TTVI",
];
const translations = { STT: "Nationalliga" };

const trophyNames = [
  "Schweizer Cup",
  "AGTT Cup",
  "ANJTT Cup",
  "ATTT Cup",
  "AVVF Coupe",
  "NWTTV Cup",
  "OTTV Cup",
  "TTVI Cup",
  "MTTV Cup",
];

const assocs = assocNames.map((name) => {
  const key = `${spaceToPlus(name)}+23%2F24`;
  return {
    name,
    href: `/assoc/${encodeURIComponent(key)}`,
  };
});
console.log(assocs);
const trophies = trophyNames.map((name) => ({
  name,
  href: clientHref(`/leaguePage?championship=${spaceToPlus(name)}+23%2F24`),
}));

class Home extends Component {
  onClose = () => {
    localStorage.removeItem("me");
    this.setState({
      closed: true,
    });
  };

  render({ pending, rejected, data, me }, { closed }) {
    if (pending) return <LoadingPage />;
    if (rejected) return <ErrorPage info={rejected} />;

    return (
      <div>
        <Header />
        <Container>
          <Card name="Neu: Clublogos">
            TT-Mobile unterstützt neu Clublogos! Falls das Logo deines Vereins
            noch fehlt, sende es bitte per Mail an{" "}
            <a href="mailto:feedback@tt-mobile.ch">feedback@tt-mobile.ch</a>.
            <br />
          </Card>
          <br />
          {data && !closed ? (
            <Card name={data.name} closeable="true" onClose={this.onClose}>
              <PlayerLinks {...data} me={me} />
            </Card>
          ) : (
            <Card name="TT-mobile personalisieren">
              Um die App zu personalisieren, öffne deine Spieler-Seite und wähle
              &quot;Das bin ich!&quot;
              <br />
            </Card>
          )}
          <br />
          <CardList
            name="Punktspiele"
            content={assocs}
            translations={translations}
          />
          <br />
          <CardList name="Pokalspiele" content={trophies} />
          <br />
          <CardList name="Ergebnisarchive" content={history} nameAsKey={true} />
        </Container>
        <Footer />
      </div>
    );
  }
}

function PlayerLinks({ club, clubId, teams, me }) {
  return (
    <Table>
      <tbody>
        <LinkRow href={clientHref(me)}>
          <td>Spielerprofil</td>
          <td class="thin">
            <i class="icon-right-open" />
          </td>
        </LinkRow>
        <LinkRow href={clientHref({ clubId })}>
          <td>{club}</td>
          <td class="thin">
            <i class="icon-right-open" />
          </td>
        </LinkRow>
        {teams.map(({ name, href }) => (
          <LinkRow key={href} href={clientHref(href)}>
            <td>{name}</td>
            <td class="thin">
              <i class="icon-right-open" />
            </td>
          </LinkRow>
        ))}
      </tbody>
    </Table>
  );
}
export default wire("model", { data: ["api.me"], me: ["me"] })(Home);
