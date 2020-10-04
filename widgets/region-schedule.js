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
    rows = `<tr><td colspan="4">Keine Spiele gefunden</td></tr>`;
  }
  const title = options.showTitle
    ? options.linkTo
      ? `<h2><a href="${options.linkTo}">${options.name}</a></h2>`
      : `<h2>${options.name}</h2>`
    : "";

  const html = `
    <table>
      <tbody>
        ${title + rows}
      </tbody>
    </table>`;
  element.insertAdjacentHTML("beforeend", html);
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
      ? `<tr><td colspan="4">${chunk.date}</td><tr>`
      : "";

  return { title, games };
}

function renderRegionRow(row, options) {
  const result = row.result
    ? `<a target="_blank" href="https://tt-mobile.ch/game/${encodeURIComponent(
        row.resultHref
      )}">${row.result}</a>`
    : "-:-";
  return `<tr>
    ${options.showLeague ? `<td>${row.league}</td>` : ""}
    ${options.showTime ? `<td>${row.time}</td>` : ""}
    <td style="text-align: right;">${row.home}</td>
    ${options.showResult ? `<td>${result}</td>` : ""}
    <td>${row.guest}</td>
  </tr>`;
}

function regionSchedule(championship, element, options = {}, callback) {
  const dateParam = options.date ? `&date=${options.date}` : "";
  fetch(`${host}regionSchedule?championship=${championship}${dateParam}`)
    .then((response) => response.json())
    .then((data) => {
      renderRegion(data.chunks, element, options);
    })
    .then(() => callback && callback());
}

function renderBox(selector, leagues, options = {}) {
  const outlet = document.querySelector(selector);
  outlet.innerHTML = "";
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
    regionSchedule(league.championship + "%2020/21", outlet, _options);
  });
}
