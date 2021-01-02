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
            row.href
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

  function renderTeam(clubs, element, options) {
    const html = `
      <tbody>
        ${clubs.map((row) => renderTeamRow(row, options)).join("")}
      </tbody>`;
    element.innerHTML = html;
  }

  function renderTeamRow(row, options) {
    return `
      <tr>
        <td>
          <a target="_blank" href="https://tt-mobile.ch/player/${encodeURIComponent(
            row.href
          )}">${row.name}</a>
        </td>
        <td>${row.classification}</td>
        <td>${row.balance}</td>
      </tr>`;
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
        renderTeam(data.players, element, options);
      });
  }

  return {
    table,
    team,
  };
})({});
