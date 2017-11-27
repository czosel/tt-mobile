import { h, Component } from 'preact'
import style from './style'

import clientHref from '../../lib/link'

import Header from '../../components/header'
import Container from '../../components/container'
import Link from '../../components/link'
import Card from '../../components/card'
import Table from '../../components/table'
import LinkRow from '../../components/link-row'

const spaceToPlus = str => str.replace(' ', '+')

const seasons = [
  { step: 0, year: '16/17' },
  { step: 1, year: '15/16' },
  { step: 2, year: '14/15' },
  { step: 1, year: '13/14' },
  { step: 1, year: '12/13' }
]

const assocNames = [
  'STT',
  'AGTT',
  'ANJTT',
  'ATTT',
  'AVVF',
  'MTTV',
  'NWTTV',
  'OTTV',
  'TTVI'
]
const translations = { STT: 'Nationalliga' }

const trophyNames = [
  'Schweizer Cup',
  'AGTT Cup',
  'ANJTT Cup',
  'ATTT Cup',
  'AVVF Coupe',
  'NWTTV Cup',
  'OTTV Cup',
  'TTVI Cup',
  'MTTV Cup'
]

const addLinks = name => ({
  name,
  href: `/leaguePage?championship=${spaceToPlus(name)}+17%2F18`
})
const assocs = assocNames.map(addLinks)
const trophies = trophyNames.map(addLinks)

export default class Home extends Component {
  render() {
    return (
      <div class={style.home}>
        <Header />
        <Container>
          <Card name="Punktspiele">
            <Table>
              <tbody>
                {assocs.map(({ name, href }) => (
                  <LinkRow href={clientHref(href)}>
                    <td>{translations[name] || name}</td>
                    <td class="thin">
                      <i class="icon-right-open" />
                    </td>
                  </LinkRow>
                ))}
              </tbody>
            </Table>
          </Card>
          <br />
          <Card name="Pokalspiele">
            <Table>
              <tbody>
                {trophies.map(({ name, href }) => (
                  <LinkRow href={clientHref(href)}>
                    <td>{translations[name] || name}</td>
                    <td class="thin">
                      <i class="icon-right-open" />
                    </td>
                  </LinkRow>
                ))}
              </tbody>
            </Table>
          </Card>
          <br />
          <Card name="Ergebnisarchiv">
            <Table>
              <tbody>
                {seasons.map(({ step, year }) => (
                  <LinkRow href={`/assocHistory/${encodeURIComponent(step)}`}>
                    <td>Season 20{year}</td>
                    <td class="thin">
                      <i class="icon-right-open" />
                    </td>
                  </LinkRow>
                ))}
              </tbody>
            </Table>
          </Card>
        </Container>
      </div>
    )
  }
}
