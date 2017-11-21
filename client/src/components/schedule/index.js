import clientHref from '../../lib/link'

import LinkRow from '../linkRow/'

export default function Schedule({ games }) {
  return (
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Datum</th>
          <th>Heim / Gast</th>
          <th>Spiele</th>
        </tr>
      </thead>
      <tbody>
        {games.map(data => {
          return data.href ? <AsLink {...data} /> : <AsRow {...data} />
        })}
      </tbody>
    </table>
  )
}

function AsRow({ date, home, guest, result }) {
  return (
    <tr>
      <td>{date}</td>
      <td>
        {home}
        <br />
        {guest}
      </td>
      <td>{result}</td>
    </tr>
  )
}

function AsLink({ href, date, home, guest, result }) {
  return (
    <LinkRow href={clientHref(href)}>
      <td>{date}</td>
      <td>
        {home}
        <br />
        {guest}
      </td>
      <td>{result}</td>
    </LinkRow>
  )
}
