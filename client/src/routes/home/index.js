import { Component } from 'preact'
import wire from 'wiretie'
import style from './style'

import clientHref from '../../lib/link'

import Header from '../../components/header'
import Container from '../../components/container'
import CardList from '../../components/card-list'
import Card from '../../components/card'
import PlayerOverview from '../../components/player-overview'
import LoadingPage from '../../components/loading-page'
import ErrorPage from '../../components/error-page'

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

@wire('model', { data: ['api.me'] })
export default class Home extends Component {
  onClose = () => {
    localStorage.removeItem('me')
    this.setState({
      closed: true
    })
  }

  render({ pending, rejected, data }, { closed }) {
    if (pending) return <LoadingPage />
    if (rejected) return <ErrorPage info={rejected} />
    return (
      <div class={style.home}>
        <Header />
        <Container>
          {data && !closed ? (
            <Card name={data.name} closeable="true" onClose={this.onClose}>
              <PlayerOverview {...data} hidePersonal="true" />
            </Card>
          ) : (
            <Card name="Neu: TT-mobile personalisieren">
              Um die App zu personalisieren, öffne deine Spieler-Seite und wähle
              &quot;Das bin ich!&quot;<br />
              <br />
              <span class="is-size-7">
                Hinweis zum Datenschutz: Die Personalisierung wird
                ausschliesslich auf deinem Gerät gespeichert und nicht zum
                Server gesendet.
              </span>
            </Card>
          )}
          <br />
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
