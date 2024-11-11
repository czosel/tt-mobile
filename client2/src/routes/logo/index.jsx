import { h, Component } from "preact";
import Helmet from "preact-helmet";
import wire from "wiretie";

import Header from "../../components/header";
import Footer from "../../components/footer";
import Container from "../../components/container";
import LoadingPage from "../../components/loading-page";
import ErrorPage from "../../components/error-page";

import { API_ORIGIN } from "../../lib/model";

class Logo extends Component {
  setLogo = (event) => {
    const file = event.target.files[0];
    this.setState({ file });
  };

  setPassword = (event) => {
    const password = event.target.value;
    this.setState({ password });
  };

  submit = async () => {
    const data = new FormData();
    data.append("logo", this.state.file);
    data.append("password", this.state.password);
    data.append("id", this.props.id);

    const response = await fetch(`${API_ORIGIN}/upload`, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      const text = await response.text();
      this.setState({ error: `${response.status} ${text}` });
      return;
    }

    location.reload();
  };

  render({ pending, rejected, back, data }, { error, file }) {
    if (pending) return <LoadingPage back={back} />;
    if (rejected) return <ErrorPage info={rejected} />;

    const { name } = data;
    return (
      <div>
        <Helmet title={name} />
        <Header back={back} />
        <Container>
          <div class="logo-row">
            <img
              class="logo logo-lg is-pulled-left mr-3"
              src={`${API_ORIGIN}/logo/?name=${name}`}
            />
            <div>
              <h1 class="title">{name}</h1>
            </div>
          </div>
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              name="logo"
              onInput={this.setLogo}
            />
            <span class="file-cta">
              <span class="file-label">Choose a file</span>
            </span>
            {file && <span class="file-name">{file.name}</span>}
          </label>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" type="password" onInput={this.setPassword} />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-link" onClick={this.submit}>
                Submit
              </button>
            </div>
          </div>
          {error && (
            <p class="has-text-danger">Error while uploading file: {error}</p>
          )}
        </Container>
        <Footer />
      </div>
    );
  }
}
export default wire("model", { data: ["api.clubTeams", "id"] })(Logo);
