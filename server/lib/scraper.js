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

const removeIfNotList = (obj, prop) => {
  return !Array.isArray(obj[prop]) ? R.omit([prop], obj) : obj
}

const simplifyLinks = obj => {
  return {
    ...obj,
    href: simplify(obj.href)
  }
}

// strip "/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/" from URL
const simplify = href => href.substring(href.lastIndexOf('/'))

const toArray = arr => (Array.isArray(arr) ? arr : [])

const splitTitle = title => {
  return title
    ? title
        .split('\n')
        .map(i => i.trim())
        .filter(i => !!i)
    : []
}

function assocHistory({ step }) {
  const url =
    '/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/championshipArchive?federation=STT'
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .find(`table.matrix tr:eq(${step}) td:first-child`)
      .set({
        regular: osmosis
          .find('a')
          .set('name')
          .set({
            href: '@href'
          })
      })
      .find(`table.matrix tr:eq(${step}) td:last-child`)
      .set({
        trophy: osmosis
          .find('a')
          .set('name')
          .set({
            href: '@href'
          })
      })
      .error(R.pipe(error('assocHistory'), rej))
      .data(res)
  })
}

function assoc({ url }) {
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
      .data(({ title, leagues }) => {
        res({
          title,
          leagues: toArray(leagues).map(simplifyLinks)
        })
      })
  })
}

function league({ url }) {
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
        titleParts = splitTitle(data.title)
        res({
          assoc: titleParts[0],
          league: titleParts[1],
          title: data.title,
          games: data.games,
          clubs: toArray(data.clubs)
            .map(club => ({
              ...club,
              score: club.score.startsWith('zurückgezogen') ? '-' : club.score
            }))
            .map(simplifyLinks)
        })
      })
  })
}

function club({ url }) {
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
      .data(data => {
        res({
          league: splitTitle(data.title)[1],
          name: splitTitle(data.title)[2],
          players: toArray(data.players).map(simplifyLinks)
        })
      })
  })
}

const player1Lens = R.lensProp('player1')
const matchesLens = R.lensProp('matches')
const trimPlayers = R.over(matchesLens, R.map(R.over(player1Lens, R.toUpper())))

function game({ url }) {
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

function player({ url }) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .find('#content')
      .set({
        title: '#content-row1 h1',
        classification: 'table.result-set:first tr:nth-child(4) td:last',
        teams: osmosis
          .find('table.result-set:nth(2) tr td a')
          .set('name')
          .set({
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
        let current = parseInt(data.elo.start)
        const start = current
        let result = []
        data.elo.data.filter(v => !!v.delta).forEach(elo => {
          current = current - parseInt(elo.delta)
          result.push(current)
        })

        res({
          ...data,
          name: splitTitle(data.title)[1],
          teams: arrayify(data.teams).map(simplifyLinks),
          balance: unique(
            data.balance
              .split('\n')
              .filter(str => !!str.trim())
              .map(str => ({
                team: str.substr(0, str.indexOf(':')).trim(),
                data: str.substr(str.indexOf(':') + 1).trim()
              }))
          ),
          elo: {
            start,
            data: result.reverse()
          }
        })
      })
  })
}

module.exports = {
  arrayify,
  assocHistory,
  assoc,
  league,
  club,
  game,
  player
}
