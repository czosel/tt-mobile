import clientHref from "../../lib/link";

import LinkRow from "../link-row";
import Table from "../table";

export default function Schedule({ chunks }) {
  return (
    <div>
      {Array.isArray(chunks) &&
        chunks.map(({ date, games }) => (
          <div key={date}>
            {date && <p class="is-size-7">{date}</p>}
            <Table>
              <tbody>
                {games.map(({ href, home, guest, result }, index) => (
                  <LinkRow key={index} href={clientHref(href)}>
                    <td>
                      {home}
                      <br />
                      {guest}
                    </td>
                    <td class="result center">{result || "-:-"}</td>
                    <td class="thin">
                      {href && <i class="icon-right-open" />}
                    </td>
                  </LinkRow>
                ))}
              </tbody>
            </Table>
          </div>
        ))}
    </div>
  );
}
