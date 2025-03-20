var TTmobile = (function (exports) {
  "use strict";

  const host = "https://api.tt-mobile.ch/";
  // const host = "http://localhost:3020/";

  function renderTable(clubs, element, options) {
    const html = `
      <thead>${renderTableHead()}</thead>
      <tbody>
        ${clubs.map((row) => renderTableRow(row, options)).join("")}
      </tbody>`;
    element.innerHTML = html;
  }

  function clubName(teamName) {
    const parts = teamName.split(" ");
    if (/[IVX]+$/.test(parts[parts.length - 1])) {
      return parts.slice(0, -1).join(" ");
    }
    return parts.join(" ");
  }

  function renderTableRow(row, options) {
    const match = options.highlight && row.name.includes(options.highlight);
    const logoSize = options.logoSize || "50px";
    return `
      <tr>
        <td>${row.rank}</td>
        <td>
          <img class="tt-mobile-logo"
            style="max-width: ${logoSize}; max-height: ${logoSize}; border-radius: 5px;"
            src="${host}logo/?name=${clubName(row.name)}" />
        </td>
        <td>
          <a target="_blank" href="https://tt-mobile.ch/team/${encodeURIComponent(
            row.href,
          )}">
            ${match ? highlight(row.name) : row.name}
          </a>
        </td>
        <td>${row.nrOfGames}</td>
        <td>${row.games}</td>
        <td>${row.balance}</td>
        <td>${row.score}</td>
      </tr>`;
  }

  function highlight(name) {
    return "<strong>".concat(name, "</strong>");
  }

  function renderTableHead() {
    return `<tr>
      <th></th>
      <th></th>
      <th>Mannschaft</th>
      <th>Beg.</th>
      <th>Spiele</th>
      <th>+/-</th>
      <th>Punkte</th>
    </tr>`;
  }

  function renderTeam(data, element, options) {
    const showPlayers = options.showPlayers !== false;
    const teamHtml = showPlayers
      ? `
      <table class="tt-team-players">
        <tbody>
          ${data.players.map((row) => renderTeamRow(row, options)).join("")}
        </tbody>
      </table>`
      : "";
    const divider =
      showPlayers && options.showSchedule ? "<hr class='tt-team-divider'>" : "";
    const teamScheduleHtml = options.showSchedule
      ? `
      <table class="tt-team-schedule">
        <tbody>
          ${data.games
            .map((game) => renderTeamScheduleRow(game, options))
            .join("")}
        </tbody>
      </table>
    `
      : "";
    element.innerHTML = teamHtml + divider + teamScheduleHtml;
  }

  function renderTeamScheduleRow(row, options) {
    const logoSize = options.logoSize || "50px";
    return `
      <tr>
        <td>${row.date}, ${row.time}</td>
        <td>${row.isHome ? "Zuhause" : "Auswärts"}</td>
        <td>
          <img class="tt-mobile-logo"
            style="max-width: ${logoSize}; max-height: ${logoSize}; border-radius: 5px;"
            src="${host}logo/?name=${clubName(row.opponent)}" />
        </td>
        <td>${row.opponent}</td>
        <td>${wrapResult(row.href, row.result)}</td>
      </tr>
    `;
  }

  function renderTeamRow(row, options) {
    return `
      <tr>
        <td>
          <a target="_blank" href="https://tt-mobile.ch/player/${encodeURIComponent(
            row.href,
          )}">${row.name}</a>
        </td>
        <td>${row.classification}</td>
        <td>${row.balance}</td>
      </tr>`;
  }

  function renderSchedule(data, element, options) {
    if (
      options.variant == "responsive" &&
      !("container" in document.documentElement.style)
    ) {
      import("https://unpkg.com/container-query-polyfill@^0.2.0");
    }

    const mobileStyles = `
      .tt-time { display: none; }
      .tt-result { display: none; }
      .tt-game {
        display: grid;
        grid-template-columns: 2fr 40px 3fr 1fr;
        grid-template-areas:
          "league logo-home  home  result-home"
          "league logo-guest guest result-guest";
        grid-gap: 4px;
        margin-bottom: 1rem;
      }`;

    const desktopStyles = `
      .tt-time { display: block; }
      .tt-result { width: 45px; display: block; }
      .tt-result-home { display: none; }
      .tt-result-guest { display: none; }

      .tt-home { text-align: right; }
      .tt-game {
        display: grid;
        grid-template-columns: 2fr 0.5fr 3fr 40px 0.5fr 40px 3fr;
        grid-template-areas:
          "league time home logo-home result logo-guest guest"
      }`;

    const containerQuery = `@container (min-width: ${options.breakpoint})`;
    const responsiveStyles = `
      ${containerQuery} {
        ${desktopStyles}
      }`;

    const fallback = `<p>${options.fallback || "keine Spiele gefunden"}</p>`;
    const lastMatches =
      options.limitPrevious === undefined || options.limitPrevious > 0
        ? `<p><strong>Rückschau</strong></p>
          ${
            data.lastMatches
              .slice(-1 * options.limitPrevious)
              .map((chunk) => renderScheduleChunk(chunk, options))
              .join("") || fallback
          }`
        : "";

    const nextMatches =
      options.limitNext === undefined || options.limitNext > 0
        ? `<p><strong>Vorschau</strong></p>
          ${
            data.nextMatches
              .slice(0, options.limitNext)
              .map((chunk) => renderScheduleChunk(chunk, options))
              .join("") || fallback
          }`
        : "";

    const html = `
      <style type="text/css">
        .tt-win { font-weight: bold; }
        .tt-logo img { height: 40px; }
        .tt-game div { align-self: center; }
        .tt-logo { justify-self: end }
        .tt-result { text-align: center; }
        .tt-date { font-weight: bold; margin-bottom: 0 }
        .tt-result-home { text-align: right; }
        .tt-result-guest { text-align: right; }

        ${options.variant != "desktop" ? mobileStyles : ""}
        .tt-league { grid-area: league; }
        .tt-time { grid-area: time; }
        .tt-home { grid-area: home; }
        .tt-logo-home { grid-area: logo-home; }
        .tt-result { grid-area: result; }
        .tt-result-home { grid-area: result-home; }
        .tt-result-guest { grid-area: result-guest; }
        .tt-logo-guest { grid-area: logo-guest; }
        .tt-guest { grid-area: guest; }

        .tt-container { container-type: inline-size; }
        ${options.variant == "desktop" ? desktopStyles : ""}
        ${options.variant == "responsive" ? responsiveStyles : ""}
      </style>
      <div class="tt-container">
        ${lastMatches}
        ${nextMatches}
      </div>`;
    element.innerHTML = html;
  }

  function table(url, element, options = {}) {
    fetch(`${host}league?url=${encodeURIComponent(url)}`)
      .then((response) => response.json())
      .then((data) => {
        renderTable(data.clubs, element, options);
      });
  }

  function team(url, element, options = {}) {
    fetch(`${host}team?url=${encodeURIComponent(url)}`)
      .then((response) => response.json())
      .then((data) => {
        renderTeam(data, element, options);
      });
  }

  function schedule(clubId, element, options = {}) {
    fetch(`${host}club/${clubId}`)
      .then((response) => response.json())
      .then((data) => {
        renderSchedule(data, element, options);
      });
  }

  function renderScheduleChunk(chunk, options) {
    const games = chunk.games.map((game) => renderScheduleRow(game, options));

    // only render title if there are games
    const title =
      games.length && options.showDate !== false
        ? `<p class="tt-date">${chunk.date}</p>`
        : "";

    return `
      ${title}
      <div class="tt-schedule">
        ${games.join("")}
      </div>`;
  }

  function clubName(teamName) {
    const parts = teamName.split(" ");
    if (/[IVX]+$/.test(parts[parts.length - 1])) {
      return parts.slice(0, -1).join(" ");
    }
    return parts.join(" ");
  }

  function wrapResult(href, content) {
    return `<a target="_blank" href="https://tt-mobile.ch/game/${encodeURIComponent(
      href,
    )}">${content}</a>`;
  }

  function renderScheduleRow(row, options) {
    const scoreHome = row.result ? row.result.split(":")[0] : "-";
    const scoreGuest = row.result ? row.result.split(":")[1] : "-";
    const result = row.result
      ? `<div class="tt-result">
          ${wrapResult(row.href, row.result)}
        </div>
        <div class="tt-result-home ${
          scoreHome > scoreGuest ? "tt-win" : ""
        }">${wrapResult(row.href, scoreHome)}</div>
        <div class="tt-result-guest ${
          scoreHome < scoreGuest ? "tt-win" : ""
        }">${wrapResult(row.href, scoreGuest)}</div>`
      : `<div class="tt-result">-:-</div>
        <div class="tt-result-home">-</div>
        <div class="tt-result-guest">-</div>
      `;

    return `<div class="tt-game">
      ${
        options.showLeague !== false
          ? `<div class="tt-league">${row.league}</div>`
          : ""
      }
      ${
        options.showTime !== false
          ? `<div class="tt-time">${row.time}</div>`
          : ""
      }
      <div class="tt-home ${scoreHome > scoreGuest ? "tt-win" : ""}">${
      row.home
    }</div>
      ${
        options.showLogos !== false
          ? `<div class="tt-logo tt-logo-home"><img src="${host}logo/?name=${clubName(
              row.home,
            )}"></div>`
          : ""
      }
      ${result}
      ${
        options.showLogos !== false
          ? `<div class="tt-logo tt-logo-guest"><img src="${host}logo/?name=${clubName(
              row.guest,
            )}"></div>`
          : ""
      }
      <div class="tt-guest ${scoreHome < scoreGuest ? "tt-win" : ""}">${
      row.guest
    }</div>
    </div>`;
  }

  return {
    table,
    team,
    schedule,
  };
})({});
