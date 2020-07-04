import { Component } from "preact";

export default class Tabs extends Component {
  handleChange = () => {
    this.props.onChange(this.props.name);
  };

  render({ children, name, active }) {
    return (
      <li class={active === name ? "is-active" : ""}>
        <a onClick={this.handleChange}>{children}</a>
      </li>
    );
  }
}
