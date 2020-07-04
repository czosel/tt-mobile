import { Component } from "preact";
import style from "./style";

export default class Header extends Component {
  render({ href, children }) {
    return <a class={style.link} {...{ href, children }} />;
  }
}
