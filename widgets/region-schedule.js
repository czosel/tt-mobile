const outlet = document.querySelector(".outlet");
const host = "https://api.tt-mobile.ch/";
// const host = "http://localhost:3020/";

const config = [
  {
    name: "National",
    championship: "STT",
    leagues: [
      { name: "NLA", championship: "STT", filter: ["NLA"] },
      { name: "NLB", championship: "STT", filter: ["NLB"] },
      { name: "NLC", championship: "STT", filter: ["NLC"] },
    ],
  },
  {
    name: "Regional",
    championship: "MTTV",
    leagues: [
      { name: "1. Liga", championship: "MTTV", filter: ["1. Liga"] },
      { name: "2. Liga", championship: "MTTV", filter: ["2. Liga"] },
      { name: "3. Liga", championship: "MTTV", filter: ["3. Liga"] },
    ],
  },
];

function renderRegion(chunks, element, options) {
  const html = `
    <h2><a href="javascript:void(0)" class="region" data-region="${
      options.name
    }">${options.name}</a></h2>
    <table>
      <tbody>
        ${chunks.map((chunk) => renderRegionChunk(chunk, options)).join("")}
      </tbody>
    </table>`;
  element.insertAdjacentHTML("beforeend", html);
}

function renderRegionChunk(chunk, options) {
  if (!options.gameFilter) {
    options.gameFilter = (x) => x;
  }
  return chunk.games
    .filter(options.gameFilter)
    .map((game) => renderRegionRow(game, options))
    .join("");
}

function renderRegionRow(row, options) {
  const result = row.result
    ? `<a href="https://tt-mobile.ch/game/${encodeURIComponent(
        row.resultHref
      )}">${row.result}</a>`
    : "-:-";
  return `<tr>
    <td>${row.league}</td>
    <td style="text-align: right;">${row.home}</td>
    <td>${result}</td>
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

function renderBox(leagues, options = {}) {
  outlet.innerHTML = "";
  leagues.forEach((league) => {
    const _options = {
      gameFilter:
        league.filter &&
        ((game) => league.filter.find((l) => game.league.includes(l))),
      name: league.name,
    };
    regionSchedule(league.championship + "%2020/21", outlet, _options, () => {
      document.querySelectorAll("h2 a.region").forEach((el) => {
        el.addEventListener("click", onHeadingClick);
      });
    });
  });
}

function onHeadingClick(event) {
  const selected = event.target.getAttribute("data-region");
  const region = config.find((region) => region.name === selected);
  renderBox(region.leagues);
}

renderBox(config);
