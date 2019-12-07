import { Component } from 'preact'
import wire from 'wiretie'
import style from './style'

import clientHref from '../../lib/link'

import Header from '../../components/header'
import Footer from '../../components/footer'
import Container from '../../components/container'
import CardList from '../../components/card-list'
import Card from '../../components/card'
import LinkRow from '../../components/link-row/'
import LoadingPage from '../../components/loading-page'
import ErrorPage from '../../components/error-page'
import Table from '../../components/table'

const spaceToPlus = str => str.replace(' ', '+')

const seasons = ['18/19', '17/18', '16/17', '15/16', '14/15', '13/14', '12/13']

const history = seasons.map((year, step) => ({
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
  href: clientHref(`/leaguePage?championship=${spaceToPlus(name)}+19%2F20`)
})
const assocs = assocNames.map(addLinks)
const trophies = trophyNames.map(addLinks)

@wire('model', { data: ['api.me'], me: ['me'] })
export default class Home extends Component {
  onClose = () => {
    localStorage.removeItem('me')
    this.setState({
      closed: true
    })
  }

  render({ pending, rejected, data, me }, { closed }) {
    if (pending) return <LoadingPage />
    if (rejected) return <ErrorPage info={rejected} />

    return (
      <div class={style.home}>
        <Header />
        <Container>
          {data && !closed ? (
            <Card name={data.name} closeable="true" onClose={this.onClose}>
              <PlayerLinks {...data} me={me} />
            </Card>
          ) : (
            <Card name="TT-mobile personalisieren">
              Um die App zu personalisieren, öffne deine Spieler-Seite und wähle
              &quot;Das bin ich!&quot;
              <br />
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
        <Footer />
      </div>
    )
  }
}

function PlayerLinks({ club, clubId, teams, me }) {
  return (
    <Table>
      <tbody>
        <LinkRow href={clientHref(me)}>
          <td>Spielerprofil</td>
          <td class="thin">
            <i class="icon-right-open" />
          </td>
        </LinkRow>
        <LinkRow href={clientHref({ clubId })}>
          <td>{club}</td>
          <td class="thin">
            <i class="icon-right-open" />
          </td>
        </LinkRow>
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
  )
}
