import { h, Component, cloneElement } from 'preact'

export default class Tabs extends Component {
  render({ children, active, onChange }) {
    return (
      <div class="tabs is-toggle is-fullwidth">
        <ul>
          {children.map(child => cloneElement(child, { active, onChange }))}
        </ul>
      </div>
    )
  }
}
