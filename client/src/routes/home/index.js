import { Component } from "preact";
import Obfuscate from "react-obfuscate";
import wire from "wiretie";
import style from "./style";

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
const CONTACT = process.env.PREACT_APP_CONTACT;

const seasons = [
  "24/25",
  "23/24",
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

const addLinks = (name) => ({
  name,
  href: clientHref(`/leaguePage?championship=${spaceToPlus(name)}+25%2F26`),
});
const assocs = assocNames.map(addLinks);
const trophies = trophyNames.map(addLinks);

export default
@wire("model", { data: ["api.me"], me: ["me"] })
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
      <div class={style.home}>
        <Header />
        <Container>
          <Card name="Neu: Clublogos">
            TT-Mobile unterstützt neu Clublogos! Falls das Logo deines Vereins
            noch fehlt, sende es bitte per Mail an <Obfuscate email={CONTACT} />
            .
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
