var TTmobile = (function(exports) {
  'use strict'

  function renderTable(clubs, element, options) {
    const html = `
      <thead>${renderTableHead()}</thead>
      <tbody>
        ${clubs.map(row => renderTableRow(row, options)).join('')}
      </tbody>`
    element.innerHTML = html
  }

  function renderTableRow(row, options) {
    const match = options.highlight && row.name.includes(options.highlight)
    return `
      <tr>
        <td>${row.rank}</td>
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
      </tr>`
  }

  function highlight(name) {
    return '<strong>'.concat(name, '</strong>')
  }

  function renderTableHead() {
    return `<tr>
      <th></th>
      <th>Mannschaft</th>
      <th>Beg.</th>
      <th>Spiele</th>
      <th>+/-</th>
      <th>Punkte</th>
    </tr>`
  }

  function renderTeam(clubs, element, options) {
    const html = `
      <tbody>
        ${clubs.map(row => renderTeamRow(row, options)).join('')}
      </tbody>`
    element.innerHTML = html
  }

  function renderTeamRow(row, options) {
    return `
      <tr>
        <td>
          <a target="_blank" href="https://tt-mobile.ch/team/${encodeURIComponent(
            row.href
          )}">${row.name}</a>
        </td>
        <td>${row.classification}</td>
        <td>${row.balance}</td>
      </tr>`
  }

  function table(url, element, options = {}) {
    fetch('https://api.tt-mobile.ch/league?url=' + encodeURIComponent(url))
      .then(response => response.json())
      .then(data => {
        renderTable(data.clubs, element, options)
      })
  }

  function team(url, element, options = {}) {
    fetch('https://api.tt-mobile.ch/team?url=' + encodeURIComponent(url))
      .then(response => response.json())
      .then(data => {
        renderTeam(data.players, element, options)
      })
  }

  return {
    table,
    team
  }
})({})
