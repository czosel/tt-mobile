import { h } from "preact";

import clientHref from "../../lib/link";

import Loading from "../../components/loading";
import LinkRow from "../../components/link-row/";
import Table from "../../components/table";
import EloChart from "../../components/elo-chart";
import EloScore from "../../components/elo-score";

export default function PlayerOverview({
  balances,
  seasons,
  classification,
  club,
  clubId,
  teams,
  elo,
  gender,
}) {
  const latestElo = elo && Math.round(elo.data[elo.data.length - 1]);
  return (
    <div>
      <Table>
        <LinkRow href={clientHref({ clubId })}>
          <td>Verein</td>
          <td>{club}</td>
          <td class="thin">
            <i class="icon-right-open" />
          </td>
        </LinkRow>
        <tr>
          <td>Klassierung</td>
          <td>
            <EloScore value={classification} />
          </td>
        </tr>
        <tr>
          <td>Klassierung (aktuell)</td>
          {latestElo ? (
            <td>
              <EloScore value={latestElo} gender={gender} /> ({latestElo})
            </td>
          ) : (
            <td>lädt...</td>
          )}
        </tr>
      </Table>
      <div style="margin: 1rem 0;">
        {elo ? <EloChart {...elo} /> : <Loading />}
      </div>
      <h2 class="subtitle">Mannschaftseinsätze</h2>
      <Table>
        <tbody>
          {teams.length ? (
            teams.map(({ name, href }) => (
              <LinkRow key={href} href={clientHref(href)}>
                <td>{name}</td>
                <td class="thin">
                  <i class="icon-right-open" />
                </td>
              </LinkRow>
            ))
          ) : (
            <tr>
              <td colSpan="2">(Keine)</td>
            </tr>
          )}
        </tbody>
      </Table>
      <h2 class="subtitle">Einzelbilanzen</h2>
      <Table>
        <tbody>
          {balances.length ? (
            balances.map(({ team, data }) => (
              <tr key={team}>
                <td>{team}</td>
                <td>{data}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">(Keine)</td>
            </tr>
          )}
        </tbody>
      </Table>
      <h2 class="subtitle">Saisons</h2>
      <Table>
        <tbody>
          {seasons.map(({ name, href }) => (
            <LinkRow key={href} href={clientHref(href)}>
              <td>{name}</td>
              <td class="thin">
                <i class="icon-right-open" />
              </td>
            </LinkRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
