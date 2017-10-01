import { h, Component } from 'preact'
import style from './style'

export default class Tabs extends Component {
  render({ children }) {
    return (
      <div class="tabs is-toggle is-fullwidth">
        <ul {...{ children }} />
      </div>
    )
  }
}
