const host = "https://api.tt-mobile.ch/";
// const host = "http://localhost:3020/";

function renderRegion(chunks, element, options) {
  let offset = 0;
  let rows = "";

  for (chunk of chunks.reverse()) {
    const info = renderRegionChunk(chunk, options, offset);
    rows = info.title + info.games.join("") + rows;
    offset += info.games.length;
  }
  if (!rows) {
    rows = `<p class="">Keine Spiele für die aktuelle Woche gefunden</p>`;
  }
  const title = options.showTitle
    ? options.linkTo
      ? `<h2><a href="${options.linkTo}">${options.name}</a></h2>`
      : `<h2>${options.name}</h2>`
    : "";

  return `
    ${title}
    <div class="tt-region-schedule">
      ${rows}
    </div>`;
}

function renderRegionChunk(chunk, options, offset = 0) {
  const gameStateFilter = () => {
    if (!options.games || options.games == "all") {
      return (game) => game;
    }
    return (game) => (options.games == "upcoming") ^ !!game.result;
  };
  if (!options.gameFilter) {
    options.gameFilter = (x) => x;
  }

  const _games = chunk.games
    .filter(gameStateFilter())
    .filter(options.gameFilter);

  const games = _games
    .slice(Math.max(0, _games.length - options.limit + offset), _games.length)
    .map((game) => renderRegionRow(game, options));

  // only render title if there are games
  const title =
    games.length && options.showDate
      ? `<p class="tt-date">${chunk.date}</p>`
      : "";

  return { title, games };
}

function clubName(teamName) {
  const parts = teamName.split(" ");
  if (/[IVX]+$/.test(parts[parts.length - 1])) {
    return parts.slice(0, -1).join(" ");
  }
  return parts.join(" ");
}

function renderRegionRow(row, options) {
  const scoreHome = row.result ? row.result.split(":")[0] : "-";
  const scoreGuest = row.result ? row.result.split(":")[1] : "-";
  const wrapResult = (href, content) =>
    `<a target="_blank" href="https://tt-mobile.ch/game/${encodeURIComponent(
      href
    )}">${content}</a>`;
  const result = row.result
    ? `<div class="tt-result">
        ${wrapResult(row.resultHref, row.result)}
      </div>
      <div class="tt-result-home ${
        scoreHome > scoreGuest ? "tt-win" : ""
      }">${wrapResult(row.resultHref, scoreHome)}</div>
      <div class="tt-result-guest ${
        scoreHome < scoreGuest ? "tt-win" : ""
      }">${wrapResult(row.resultHref, scoreGuest)}</div>`
    : `<div class="tt-result">-:-</div>
      <div class="tt-result-home">-</div>
      <div class="tt-result-guest">-</div>
    `;

  return `<div class="tt-game">
    ${options.showLeague ? `<div class="tt-league">${row.league}</div>` : ""}
    ${options.showTime ? `<div class="tt-time">${row.time}</div>` : ""}
    <div class="tt-home ${scoreHome > scoreGuest ? "tt-win" : ""}">${
    row.home
  }</div>
    ${
      options.showLogos
        ? `<div class="tt-logo tt-logo-home"><img src="${host}logo/?name=${clubName(
            row.home
          )}"></div>`
        : ""
    }
    ${result}
    ${
      options.showLogos
        ? `<div class="tt-logo tt-logo-guest"><img src="${host}logo/?name=${clubName(
            row.guest
          )}"></div>`
        : ""
    }
    <div class="tt-guest ${scoreHome < scoreGuest ? "tt-win" : ""}">${
    row.guest
  }</div>
  </div>`;
}

function regionSchedule(championship, element, options = {}, callback) {
  const dateParam = options.date ? `&date=${options.date}` : "";
  fetch(`${host}regionSchedule?championship=${championship}${dateParam}`)
    .then((response) => response.json())
    .then((data) => {
      return renderRegion(data.chunks, element, options);
    })
    .then((data) => callback && callback(data));
}

function renderBox(selector, leagues, options = {}) {
  const outlet = document.querySelector(selector);
  outlet.innerHTML = `
  <style type="text/css">
    .tt-win { font-weight: bold; }
    .tt-logo img { width: 40px; }
    .tt-game div { align-self: center; }
    .tt-logo { justify-self: end }
    .tt-result { text-align: center; }
    .tt-result-home { text-align: right; }
    .tt-result-guest { text-align: right; }
    .tt-time { display: none; }
    .tt-result { display: none; }

    .tt-league { grid-area: league; }
    .tt-time { grid-area: time; }
    .tt-home { grid-area: home; }
    .tt-logo-home { grid-area: logo-home; }
    .tt-result { grid-area: result; }
    .tt-result-home { grid-area: result-home; }
    .tt-result-guest { grid-area: result-guest; }
    .tt-logo-guest { grid-area: logo-guest; }
    .tt-guest { grid-area: guest; }

    .tt-game {
      display: grid;
      grid-template-columns: ${options.showLeague ? "2fr" : ""} 40px 3fr 1fr;
      grid-template-areas:
        "${options.showLeague ? "league" : ""} logo-home  home  result-home"
        "${options.showLeague ? "league" : ""} logo-guest guest result-guest";
      grid-gap: 4px;
      margin-bottom: 1rem;
    }

    @media screen and (min-width: ${options.breakpoint || "500px"}) {
      .tt-time { display: block; }
      .tt-result { display: block; }
      .tt-result-home { display: none; }
      .tt-result-guest { display: none; }

      .tt-home { text-align: right; }
      .tt-game {
        grid-template-columns: ${
          options.showLeague ? "2fr" : ""
        } 0.5fr 3fr 40px 0.5fr 40px 3fr;
        grid-template-areas:
          "${
            options.showLeague ? "league" : ""
          } time home logo-home result logo-guest guest"
      }
    }
  </style>`;

  leagues.forEach((league) => {
    const gameFilter = (game) => {
      if (league.include) {
        return league.include.find((l) => game.league.includes(l));
      }
      if (league.exclude) {
        return !league.exclude.find((l) => game.league.includes(l));
      }
      return true;
    };
    const _options = {
      ...options,
      gameFilter,
      name: league.name,
      linkTo: league.linkTo,
    };
    const afterSummer = new Date().getMonth() >= 7;
    const startYear = new Date().getFullYear() - (afterSummer ? 0 : 1);
    const endYear = (startYear + 1).toString().substring(2);
    const season = options.season || `${startYear}/${endYear}`;
    regionSchedule(
      `${league.championship}%${season}`,
      outlet,
      _options,
      (data) => {
        outlet.insertAdjacentHTML("beforeend", data);
      }
    );
  });
}
