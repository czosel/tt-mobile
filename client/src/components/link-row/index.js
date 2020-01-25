import { Component } from 'preact'
import { route } from 'preact-router'
import style from './style'

export default class LinkRow extends Component {
  onOpen = () => {
    if (this.props.href) {
      route(this.props.href)
    }
  }

  render({ children, href, ...props }) {
    return href ? (
      <tr
        class={(style.row, props.class)}
        onClick={this.onOpen}
        {...{ children }}
      />
    ) : (
      <tr class={('no-hover', props.class)} {...{ children }} />
    )
  }
}
