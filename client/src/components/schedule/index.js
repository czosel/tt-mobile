import clientHref from '../../lib/link'
import style from './style'

import LinkRow from '../linkRow/'

export default function Schedule({ chunks }) {
  return (
    <div>
      {chunks.map(({ date, games }) => (
        <div>
          {date && <p class="is-size-7">{date}</p>}
          <table class="table is-fullwidth">
            {games.map(({ href, date, home, guest, result }) => (
              <LinkRow href={clientHref(href)}>
                <td>
                  {home}
                  <br />
                  {guest}
                </td>
                <td class="result center">{result || '-:-'}</td>
              </LinkRow>
            ))}
          </table>
        </div>
      ))}
    </div>
  )
}
