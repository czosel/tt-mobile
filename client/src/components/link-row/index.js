import { Component } from "preact";
import { route } from "preact-router";
import style from "./style";

export default class LinkRow extends Component {
  onOpen = () => {
    if (this.props.href) {
      route(this.props.href);
    }
  };

  render({ children, href }) {
    return href ? (
      <tr class={style.row} onClick={this.onOpen} {...{ children }} />
    ) : (
      <tr class="no-hover" {...{ children }} />
    );
  }
}
