import { Component } from "preact";

import style from "./style";

import clientHref from "../../lib/link";

import Header from "../../components/header";
import Footer from "../../components/footer";
import Container from "../../components/container";
import LinkRow from "../../components/link-row/";
import Table from "../../components/table";
import EloScore from "../../components/elo-score";

import { API_ORIGIN } from "../../lib/model";

function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}

export default class Search extends Component {
  search = debounce((event) => {
    if (!event.target.value) {
      return this.setState({ data: [] });
    }
    fetch(`${API_ORIGIN}/search/${encodeURIComponent(event.target.value)}`)
      .then((r) => r.json())
      .then((json) => {
        this.setState({ data: json.data });
      });
  }, 300);

  render(_, { data = [] }) {
    return (
      <div class={style.search}>
        <Header />
        <Container>
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Suche nach Spielernamen..."
                onInput={this.search}
              />
            </div>
          </div>
          <Results data={data} />
        </Container>
        <Footer />
      </div>
    );
  }
}

function Results({ data }) {
  return (
    <Table>
      <tbody>
        {data && data.map((row) => <Result key={row.href} {...row} />)}
      </tbody>
    </Table>
  );
}

function Result({ name, href, elo }) {
  return (
    <LinkRow href={clientHref(href)}>
      <td>{name}</td>
      <td class="thin">
        <EloScore value={parseInt(elo, 10)} />
      </td>
      <td class="thin">
        <i class="icon-right-open" />
      </td>
    </LinkRow>
  );
}
