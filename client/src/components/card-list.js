import Card from './card'
import Table from './table'
import LinkRow from './link-row'

export default function CardList({
  name,
  content,
  translations = {},
  nameAsKey = false,
}) {
  return (
    <Card name={name}>
      <Table>
        <tbody>
          {content.map(({ name, href }) => (
            <LinkRow key={nameAsKey ? name : href} href={href}>
              <td>{translations[name] || name}</td>
              <td class="thin">
                <i class="icon-right-open" />
              </td>
            </LinkRow>
          ))}
        </tbody>
      </Table>
    </Card>
  )
}
