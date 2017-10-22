import { h, Component } from 'preact'
import style from './style'

import Link from '../../components/link'
import LinkListItem from '../../components/linkListItem'

const spaceToPlus = str => str.replace(' ', '+')

const seasons = [
  { step: 0, year: '16/17' },
  { step: 1, year: '15/16' },
  { step: 2, year: '14/15' },
  { step: 1, year: '13/14' },
  { step: 1, year: '12/13' }
]

const assocNames = ['STT', 'AGTT', 'ANJTT', 'ATTT', 'AVVF', 'MTTV', 'NWTTV']
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
  href: `leaguePage?championship=${spaceToPlus(name)}+17%2F18`
})
const assocs = assocNames.map(addLinks)
const trophies = trophyNames.map(addLinks)

export default class Home extends Component {
  render() {
    return (
      <div class={style.home}>
        <h2 class="subtitle">Punktspiele</h2>
        <ul class="link-list">
          {assocs.map(({ name, href }) => (
            <LinkListItem href={`/assoc/${encodeURIComponent(href)}`}>
              {translations[name] || name}
            </LinkListItem>
          ))}
        </ul>
        <h2 class="subtitle">Pokalspiele</h2>
        <ul class="link-list">
          {trophies.map(({ name, href }) => (
            <LinkListItem href={`assoc/${encodeURIComponent(href)}`}>
              {translations[name] || name}
            </LinkListItem>
          ))}
        </ul>
      </div>
    )
  }
}
