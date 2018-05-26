import { h } from 'preact'

import clientHref from '../../lib/link'

import LinkRow from '../../components/link-row/'
import Table from '../../components/table'
import EloChart from '../../components/elo-chart'
import EloScore from '../../components/elo-score'

export default function PlayerOverview({
  balance,
  classification,
  elo,
  club,
  clubId,
  teams
}) {
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
          <td>
            <EloScore value={elo.start} /> ({elo.start})
          </td>
        </tr>
      </Table>
      <EloChart data={elo.data} />
      <h2 class="subtitle">Mannschaftseinsätze</h2>
      <Table>
        <tbody>
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
      <h2 class="subtitle">Einzelbilanzen</h2>
      <Table>
        {balance.map(({ team, data }) => (
          <tr key={team}>
            <td>{team}</td>
            <td>{data}</td>
          </tr>
        ))}
      </Table>
    </div>
  )
}
