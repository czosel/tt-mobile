const util = require('util')
const R = require('ramda')
const { resolve } = require('url')

const osmosis = require('osmosis')

const host = 'http://click-tt.ch'

function unique(arr) {
  return arr.filter(
    (entry, index, self) =>
      self.findIndex(t => {
        return t.data === entry.data && t.team === entry.team
      }) === index
  )
}

const logger = R.curry((level, prefix, val) => {
  console[level](prefix, val)
  return val
})
const log = logger('log')
const error = logger('error')

const arrayify = R.unless(Array.isArray, a => [a])

function staticData() {
  return new Promise((res, rej) => {
    osmosis
      .get(
        resolve(
          host,
          '/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/leaguePage?championship=MTTV+16/17&preferredLanguage=German'
        )
      )
      .find('table.matrix td:first-child ul:nth-child(2) li span a')
      .set('league')
      .set({
        href: '@href'
      })
      .set({
        clubs: osmosis
          .follow('@href')
          .find('#content-row2 table.result-set:first tr:not(:first-child)')
          .set({
            rank: 'td:nth-child(2)',
            name: 'td:nth-child(3)',
            href: 'td:nth-child(3) a@href'
          })
          .set({
            players: osmosis
              .find('td:nth-child(3) a')
              .follow('@href')
              .find('#content-row2 table.result-set tr:has(td:nth-child(2) a)')
              .set({
                name: 'td:nth-child(2)',
                href: 'td:nth-child(2) a@href'
              })
          })
      })
      .error(e => {
        console.error(e)
        rej(e)
      })
      .data(res)
  })
}

function associations() {
  const url = 'index.htm.de'
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .find('#navigation > ul li:nth(2)')
      .set({
        title: 'strong',
        associations: osmosis.find('ul li').set({
          name: 'a',
          href: 'a@href'
        })
      })
      .error(R.pipe(error('associations'), rej))
      .data(res)
  })
}

function assoc(url) {
  if (url.indexOf('17/18') > -1) {
    url = url.replace('17/18', '16/17')
  }
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .find('#content')
      .set({
        title: '#content-col1 h1',
        leagues: osmosis.find('table.matrix td ul li span').set({
          name: 'a',
          href: 'a@href'
        })
      })
      .error(R.pipe(error('assoc'), rej))
      .data(res)
  })
}

function league(url) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .find('#content')
      .set({
        title: '#content-col1 h1',
        games: osmosis
          .find(
            'h2:contains("Spielplan") ~ table.result-set:first tr:not(:first-child)'
          )
          .set({
            date: 'td:nth-child(2)',
            time: 'td:nth-child(3)',
            home: 'td:nth-child(6)',
            guest: 'td:nth-child(8)',
            result: 'td:nth-child(10)',
            href: 'td:nth-child(10) a@href'
          }),
        clubs: osmosis
          .find(
            'h2:contains("Tabelle"):last ~ table.result-set:first tr:not(:first-child)'
          )
          .set({
            rank: 'td:nth-child(2)',
            name: 'td:nth-child(3)',
            href: 'td:nth-child(3) a@href',
            nrOfGames: 'td:nth-child(4)',
            score: 'td:last-child'
          })
      })
      .error(R.pipe(error('league'), rej))
      .data(data => {
        if (Array.isArray(data.clubs)) {
          data.clubs = data.clubs.map(club => {
            if (club.score.startsWith('zurückgezogen')) {
              club.score = '-'
            }
            return club
          })
        } else {
          delete data.clubs
        }
        res(data)
      })
  })
}

function club(url) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .find('#content')
      .set({
        title: '#content-row1 h1',
        players: osmosis
          .find('#content-row2 table.result-set tr:has(td:nth-child(2) a)')
          .set({
            name: 'td:nth-child(2)',
            href: 'td:nth-child(2) a@href',
            classification: 'td:nth-child(3)',
            appearances: 'td:nth-child(5)',
            balance: 'td:nth-child(8)'
          })
      })
      .error(R.pipe(error('club'), rej))
      .data(res)
  })
}

const player1Lens = R.lensProp('player1')
const matchesLens = R.lensProp('matches')
const trimPlayers = R.over(matchesLens, R.map(R.over(player1Lens, R.toUpper())))

function game(url) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .find('#content')
      .set({
        title: '#content-row1 h1',
        matches: osmosis
          .find('table.result-set tr:has(td:nth-child(2) a)')
          .set({
            player1: 'td:nth-child(2)',
            player1href: 'td:nth-child(2) a@href',
            player1class: 'td:nth-child(3)',
            player2: 'td:nth-child(4)',
            player2href: 'td:nth-child(4) a@href',
            player2class: 'td:nth-child(5)',
            sets: 'td:nth-child(11)',
            game: 'td:nth-child(12)'
          }),
        summary: osmosis.find('table.result-set tr:last').set({
          sets: 'td:nth(3)',
          game: 'td:last'
        })
      })
      .error(R.pipe(error('club'), rej))
      .data(R.pipe(trimPlayers, res))
  })
}

function player(url) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .find('#content')
      .set({
        title: '#content-row1 h1',
        classification: 'table.result-set:first tr:nth-child(4) td:last',
        teams: osmosis.find('table.result-set:nth(2) tr td a').set('name').set({
          href: '@href'
        }),
        balance: 'table.result-set:nth(2) tr:nth-child(3) > td:last',
        singles: osmosis
          .find('table.result-set:nth(3) tr:has(td:nth-child(3) a)')
          .set({
            opponent: 'td:nth-child(3)',
            opponentHref: 'td:nth-child(3) a@href',
            opponentClass: 'td:nth-child(4)',
            sets: 'td:nth-child(6)'
          }),
        doubles: osmosis
          .find('table.result-set:last tr:has(td:nth-child(3) a)')
          .set({
            partner: 'td:nth-child(3)',
            partnerHref: 'td:nth-child(3) a@href',
            partnerClass: 'td:nth-child(4)',
            opponent1: 'td:nth-child(5) a:first',
            opponent1href: 'td:nth-child(5) a:first@href',
            opponent1class: 'td:nth-child(6)',
            opponent2: 'td:nth-child(5) a:last',
            opponent2href: 'td:nth-child(5) a:last@href',
            sets: 'td:nth-child(8)',
            game: 'td:last-child'
          }),
        elo: osmosis
          .find('ul.content-tabs > li:first-child a')
          .follow('@href')
          .set({
            start: "table tr:has(td > b:contains('Elo-Wert')):first td:last",
            data: osmosis
              .find('table.result-set.table-layout-fixed tbody tr')
              .set({
                delta: 'td:last-child'
              })
          })
      })
      .error(R.pipe(error('club'), rej))
      .data(data => {
        data.teams = arrayify(data.teams)
        data.balance = unique(
          data.balance.split('\n').filter(str => !!str.trim()).map(str => ({
            team: str.substr(0, str.indexOf(':')).trim(),
            data: str.substr(str.indexOf(':') + 1).trim()
          }))
        )

        var current = parseInt(data.elo.start)
        data.elo.start = current
        var result = []
        data.elo.data.filter(v => !!v.delta).forEach(elo => {
          const val = parseInt(elo.delta)
          current = current - val
          result.push({
            delta: current
          })
        })
        data.elo.data = result.reverse()
        res(data)
      })
  })
}

module.exports = {
  arrayify,
  staticData,
  associations,
  assoc,
  league,
  club,
  game,
  player
}
