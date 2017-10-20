import { h, Component } from 'preact'
import style from './style'

import LinkRow from '../../components/linkRow/'
import Table from '../../components/table'
import EloChart from '../../components/elo-chart'
import Tabs from '../../components/tabs'
import Tab from '../../components/tab'

const API_ORIGIN = 'http://localhost:3020'
const asJson = r => r.json()

export default class Player extends Component {
  state = {
    activeTab: 'overview',
    balance: '',
    classification: '',
    singles: [],
    doubles: [],
    elo: { data: [] },
    teams: [],
    title: ''
  }

  loadItems(href) {
    fetch(`${API_ORIGIN}/player?url=${encodeURIComponent(href)}`)
      .then(asJson)
      .then(data => this.setState(data))
  }

  componentDidMount() {
    this.loadItems(this.props.href)
  }

  handleChange = activeTab => {
    this.setState({ activeTab })
  }

  render(
    {},
    { activeTab, balance, classification, singles, doubles, elo, teams, title }
  ) {
    const content =
      activeTab === 'overview' ? (
        <Overview {...{ balance, classification, elo, teams, title }} />
      ) : (
        <h1>Todo!</h1>
      )
    return (
      <div class={style.profile}>
        <Tabs active={activeTab} onChange={this.handleChange}>
          <Tab name="overview">Übersicht</Tab>
          <Tab name="single">Einzel</Tab>
        </Tabs>
        <h1 class="title" />
        <h2 class="subtitle" />
        {content}
      </div>
    )
  }
}

function Overview({ balance, classification, elo, teams, title }) {
  console.log('elo', elo.data)
  return <EloChart data={elo.data} />
}
