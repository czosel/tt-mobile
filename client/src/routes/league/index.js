import { h, Component } from "preact";
import wire from "wiretie";
import { route } from "preact-router";
import Helmet from "preact-helmet";
import style from "./style";

import clientHref from "../../lib/link";

import Header from "../../components/header";
import Embed from "../../components/embed";
import Footer from "../../components/footer";
import Container from "../../components/container";
import Schedule from "../../components/schedule";
import LoadingPage from "../../components/loading-page";
import ErrorPage from "../../components/error-page";
import LinkRow from "../../components/link-row/";
import Table from "../../components/table";
import Tabs from "../../components/tabs";
import Tab from "../../components/tab";

import { API_ORIGIN } from "../../lib/model";

export default
@wire("model", { data: ["api.league", "href"] })
class League extends Component {
  handleChange = (tab) => {
    route(clientHref(this.props.href, tab));
  };

  render({ pending, rejected, back, data, tab, href }) {
    if (pending) return <LoadingPage back={back} />;
    if (rejected) return <ErrorPage info={rejected} />;

    const { league, clubs, chunks, breadcrumbs } = data;

    tab = clubs.length === 0 ? "schedule" : tab || "table";

    const content =
      tab === "table" ? (
        <LeagueTable {...{ clubs, href }} />
      ) : (
        <Schedule {...{ chunks }} />
      );
    return (
      <div class={style.profile}>
        <Helmet title={league} />
        <Header back={back} breadcrumb={breadcrumbs[0]} />
        <Container>
          {clubs.length > 0 ? (
            <Tabs active={tab} onChange={this.handleChange}>
              <Tab name="table">Tabelle</Tab>
              <Tab name="schedule">Spielplan</Tab>
            </Tabs>
          ) : (
            <span />
          )}
          <h1 class="title">{league}</h1>
          <h2 class="subtitle">
            <a href={clientHref(breadcrumbs[0].href)}>{breadcrumbs[0].name}</a>
          </h2>
          {content}
        </Container>
        <Footer />
      </div>
    );
  }
}

function clubName(teamName) {
  const parts = teamName.split(" ");
  if (/[IVX]+$/.test(parts[parts.length - 1])) {
    return parts.slice(0, -1).join(" ");
  }
  return parts.join(" ");
}

function LeagueTable({ clubs, href }) {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th class="optional-3" />
            <th />
            <th>Mannschaft</th>
            <th class="center optional">Beg.</th>
            <th class="center optional-3">Spiele</th>
            <th class="center optional-4">+/-</th>
            <th>Punkte</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {clubs.map((club) => (
            <LeagueRow key={club.href} club={club} />
          ))}
        </tbody>
      </Table>
      <Embed param="table-url" url={href} />
    </>
  );
}

function LeagueRow({ club }) {
  let promotionIcon = "";
  if (club.promotion) {
    promotionIcon = <i className={`icon-${club.promotion}-dir`} />;
  }
  return (
    <LinkRow href={clientHref(club.href)}>
      <td className={`optional-3 ${style.rankCell}`}>
        {club.rank}
        {promotionIcon}
      </td>
      <td class="logo-col">
        <img
          class="logo"
          src={`${API_ORIGIN}/logo/?name=${clubName(club.name)}`}
        />
      </td>
      <td>{club.name}</td>
      <td class="center optional">{club.nrOfGames}</td>
      <td class="center optional-3">{club.games}</td>
      <td class="center optional-4">{club.balance}</td>
      <td class="result center">{club.score}</td>
      <td class="thin">
        <i class="icon-right-open" />
      </td>
    </LinkRow>
  );
}
