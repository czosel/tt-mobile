import { Component } from "preact";
import "./style.css";

export default class Header extends Component {
  render({ href, children }) {
    return <a class={style.link} {...{ href, children }} />;
  }
}
