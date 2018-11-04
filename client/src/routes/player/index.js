import { h, Component } from 'preact'
import { route } from 'preact-router'

import clientHref from '../../lib/link'

import Header from '../../components/header'
import Container from '../../components/container'
import Loading from '../../components/loading'
import LinkRow from '../../components/link-row/'
import Table from '../../components/table'
import ErrorPage from '../../components/error-page'
import Tabs from '../../components/tabs'
import Tab from '../../components/tab'
import EloScore from '../../components/elo-score'
import PlayerOverview from '../../components/player-overview'
import { get } from '../../lib/model'

export default class Player extends Component {
  setMe = () => {
    localStorage.setItem('me', this.props.href)
    route('/')
  }

  update(href) {
    this.setState({ pending: true })
    get('player')(href)
      .then(data => {
        this.setState({ data, pending: false, rejected: false })
        return get('elo')(data.eloHref)
      })
      .then(elo => {
        this.setState({ elo })
      })
      .catch(error =>
        this.setState({
          pending: false,
          rejected: { data: error }
        })
      )
  }

  componentDidMount() {
    this.setState({ me: localStorage.getItem('me') })
    this.update(this.props.href)
  }

  componentDidReceiveProps({ href }) {
    if (href !== this.props.href) this.update(href)
  }

  render({ href, tab, back }, { pending = true, rejected, data, elo, me }) {
    tab = tab || 'overview'
    if (pending)
      return (
        <div>
          <Loading center={true} />
          <Wrapper tab={tab} href={href} back={back} />
        </div>
      )
    if (rejected) return <ErrorPage info={rejected} />

    const {
      balance,
      classification,
      singles,
      doubles,
      club,
      clubId,
      teams,
      name
    } = data

    const content =
      tab === 'overview' ? (
        <PlayerOverview
          {...{
            balance,
            classification,
            club,
            clubId,
            teams,
            me,
            href,
            elo
          }}
        />
      ) : tab === 'single' ? (
        <Single {...{ singles }} />
      ) : (
        <Double {...{ doubles }} />
      )

    return (
      <Wrapper tab={tab} href={this.props.href} back={back}>
        {!me && (
          <button class="button is-pulled-right" onClick={this.setMe}>
            Das bin ich!
          </button>
        )}
        <h1 class="title">{name}</h1>

        {content}
      </Wrapper>
    )
  }
}

function Wrapper({ tab, href, back, children }) {
  const handleChange = tab => {
    route(clientHref(href, tab), true)
  }

  return (
    <div>
      <Header back={back} />
      <Container>
        <Tabs active={tab} onChange={handleChange}>
          <Tab name="overview">Übersicht</Tab>
          <Tab name="single">Einzel</Tab>
          <Tab name="double">Doppel</Tab>
        </Tabs>
        {children}
      </Container>
    </div>
  )
}

function Single({ singles }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Gegner</th>
          <th class="center">Klass.</th>
          <th class="center">Sätze</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {singles.map(({ opponent, classification, href, sets }) => (
          <LinkRow key={href} href={clientHref(href)}>
            <td>{opponent}</td>
            <td class="center">
              <EloScore value={classification} />
            </td>
            <td class="center">{sets}</td>
            <td class="thin">
              <i class="icon-right-open" />
            </td>
          </LinkRow>
        ))}
      </tbody>
    </Table>
  )
}

function Double({ doubles }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Partner</th>
          <th>Gegner</th>
          <th class="center">Sätze</th>
        </tr>
      </thead>
      <tbody>
        {doubles.map(({ partner, opponent1, opponent2, sets }, index) => (
          <tr key={index} class="no-hover">
            <td>{partner}</td>
            <td>
              {opponent1}
              <br />
              {opponent2}
            </td>
            <td class="center">{sets}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
