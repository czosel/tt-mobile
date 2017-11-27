import clientHref from '../../lib/link'
import style from './style'

import LinkRow from '../link-row'
import Table from '../table'

export default function Schedule({ chunks }) {
  return (
    <div>
      {chunks.map(({ date, games }) => (
        <div>
          {date && <p class="is-size-7">{date}</p>}
          <Table>
            <tbody>
              {games.map(({ href, date, home, guest, result }) => (
                <LinkRow href={clientHref(href)}>
                  <td>
                    {home}
                    <br />
                    {guest}
                  </td>
                  <td class="result center">{result || '-:-'}</td>
                  <td class="thin">{href && <i class="icon-right-open" />}</td>
                </LinkRow>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </div>
  )
}
