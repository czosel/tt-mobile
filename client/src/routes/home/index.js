import { Component } from 'preact'
import style from './style'

import clientHref from '../../lib/link'

import Header from '../../components/header'
import Container from '../../components/container'
import CardList from '../../components/card-list'

const spaceToPlus = str => str.replace(' ', '+')

const seasons = [
  { step: 0, year: '16/17' },
  { step: 1, year: '15/16' },
  { step: 2, year: '14/15' },
  { step: 1, year: '13/14' },
  { step: 1, year: '12/13' }
]

const history = seasons.map(({ step, year }) => ({
  name: `Season 20${year}`,
  href: `/assocHistory/${encodeURIComponent(step)}`
}))

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
  href: clientHref(`/leaguePage?championship=${spaceToPlus(name)}+17%2F18`)
})
const assocs = assocNames.map(addLinks)
const trophies = trophyNames.map(addLinks)

export default class Home extends Component {
  render() {
    return (
      <div class={style.home}>
        <Header />
        <Container>
          <CardList
            name="Punktspiele"
            content={assocs}
            translations={translations}
          />
          <br />
          <CardList name="Pokalspiele" content={trophies} />
          <br />
          <CardList name="Ergebnisarchive" content={history} nameAsKey={true} />
        </Container>
      </div>
    )
  }
}
