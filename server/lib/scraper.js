const { parse } = require('url')
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
const simplify = href => (href ? href.substring(href.lastIndexOf('/')) : '')

const toArray = arr => (Array.isArray(arr) ? arr : [])

const splitTitle = title => {
  return title
    ? title
        .split('\n')
        .map(i => i.trim())
        .filter(i => !!i)
    : []
}

const asChunks = games => {
  const chunks = []
  games.forEach(g => {
    if (g.date !== '') {
      chunks.push({ date: g.date, games: [] })
    }
    chunks[chunks.length - 1].games.push(g)
  })
  return chunks
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
      .data(({ regular, trophy }) => {
        res({
          regular: toArray(regular).map(simplifyLinks),
          trophy: toArray(trophy).map(simplifyLinks)
        })
      })
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
          title: splitTitle(title)[0],
          leagues: toArray(leagues).map(simplifyLinks)
        })
      })
  })
}

const findBreadcrumbs = osmosis =>
  osmosis
    .find('#breadcrumb a')
    .set('name')
    .set({
      href: '@href'
    })

const extractBreadcrumbs = ({ breadcrumbs }) =>
  toArray(breadcrumbs)
    .map(simplifyLinks)
    .slice(2)

function league({ url }) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .set({
        breadcrumbs: findBreadcrumbs(osmosis)
      })
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
            home: 'td[nowrap]:nth(4)',
            guest: 'td[nowrap]:nth(5)',
            result: 'td[nowrap]:nth(6)',
            href: 'td[nowrap]:nth(6) a@href'
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
        const titleParts = splitTitle(data.title)
        const games = toArray(data.games).map(simplifyLinks)

        res({
          assoc: titleParts[0],
          league: titleParts[1],
          title: data.title,
          breadcrumbs: extractBreadcrumbs(data),
          chunks: asChunks(games),
          clubs: toArray(data.clubs)
            .map(club => ({
              ...club,
              score: club.score.startsWith('zurückgezogen') ? '-:-' : club.score
            }))
            .map(simplifyLinks)
        })
      })
  })
}

function club(id) {
  return new Promise((res, rej) => {
    osmosis
      .get(
        resolve(
          host,
          `/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/clubInfoDisplay?club=${id}`
        )
      )
      .find('#content')
      .set({
        matches: osmosis
          .find('#content-row1 table.result-set tr:has(td:nth-child(11) a)')
          .set({
            date: 'td:nth-child(2)',
            home: 'td:nth-child(7)',
            guest: 'td:nth-child(9)',
            href: 'td:nth-child(11) a@href',
            result: 'td:nth-child(11)'
          })
      })
      .error(R.pipe(error('club'), rej))
      .data(data => {
        res({
          chunks: asChunks(toArray(data.matches).map(simplifyLinks))
        })
      })
  })
}

function clubTeams(id) {
  return new Promise((res, rej) => {
    osmosis
      .get(
        resolve(
          host,
          `/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/clubTeams?club=${id}`
        )
      )
      .find('#content')
      .set({
        title: '#content-row1 h1',
        teams: osmosis
          .find('#content-row1 table.result-set tr:has(td:nth-child(2) a)')
          .set({
            name: 'td:nth-child(1)',
            league: 'td:nth-child(2)',
            href: 'td:nth-child(2) a@href',
            captain: 'td:nth-child(3)',
            rank: 'td:nth-child(4)',
            points: 'td:nth-child(5)'
          })
      })
      .error(R.pipe(error('clubTeams'), rej))
      .data(data => {
        res({
          name: splitTitle(data.title)[0],
          teams: toArray(data.teams).map(simplifyLinks)
        })
      })
  })
}

function team({ url }) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .set({
        breadcrumbs: findBreadcrumbs(osmosis)
      })
      .find('#content')
      .set({
        title: '#content-row1 h1',
        club: '#content-row1 table.result-set tr:first-child td a',
        clubHref: '#content-row1 table.result-set tr:first-child td a@href',
        location:
          '#content-row1 table.result-set tr:first-child td:last-child:html',
        players: osmosis
          .find('#content-row2 table.result-set tr:has(td:nth-child(2) a)')
          .set({
            name: 'td:nth-child(2)',
            href: 'td:nth-child(2) a@href',
            classification: 'td:nth-child(3)',
            appearances: 'td:nth-child(5)',
            balance: 'td:nth-child(8)'
          }),
        games: osmosis
          .find(
            `#content-row2 table.result-set:nth(1) tr:not(:first-child),
             #content-row2 table.result-set:nth(0) tr:not(:first-child)`
          )
          .set({
            date: 'td:nth-child(2)',
            time: 'td:nth-child(3)',
            home: 'td:nth-child(6)',
            guest: 'td:nth-child(8)',
            result: 'td:nth-child(10)',
            href: 'td:nth-child(10) a@href'
          })
      })
      .error(R.pipe(error('club'), rej))
      .data(data => {
        const games = toArray(data.games)
          .map(simplifyLinks)
          .map(game => ({
            ...game,
            opponent: game.guest.includes(data.club) ? game.home : game.guest,
            isHome: !game.guest.includes(data.club)
          }))
        res({
          ...data,
          games,
          location: splitTitle(data.location)[3]
            .split('<br>')
            .join(', '),
          league: splitTitle(data.title)[1],
          breadcrumbs: extractBreadcrumbs(data),
          name: splitTitle(data.title)[2],
          clubId: Number(parse(data.clubHref, true).query.club),
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
      .set({
        breadcrumbs: findBreadcrumbs(osmosis)
      })
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
      .data(data => {
        const split = splitTitle(data.title)
        res({
          ...data,
          breadcrumbs: extractBreadcrumbs(data),
          assoc: split[0],
          league: split[1],
          home: split[2],
          guest: split[4].split(',')[0],
          date: split[4].split(',')[1].trim(),
          time: split[5]
        })
      })
  })
}

function player({ url }) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .set({
        breadcrumbs: findBreadcrumbs(osmosis)
      })
      .find('#content')
      .set({
        title: '#content-row1 h1',
        classification:
          '#content-row1 > table.result-set:first tr:nth-child(4) td:last',
        teams: osmosis
          .find('table.result-set table.result-set tr:nth-child(2) > td a')
          .set('name')
          .set({
            href: '@href'
          }),
        balances: osmosis
          .find(
            'table.result-set table.result-set tr:last-child > td:last-child'
          )
          .set('balance'),
        singles: osmosis
          .find(
            '#content-row1 > table.result-set:nth(2) tr:has(td:nth-child(3) a)'
          )
          .set({
            opponent: 'td:nth-child(3)',
            href: 'td:nth-child(3) a@href',
            classification: 'td:nth-child(4)',
            sets: 'td:nth-child(6)'
          }),
        doubles: osmosis
          .find(
            '#content-row1 > table.result-set:last tr:has(td:nth-child(3) a)'
          )
          .set({
            partner: 'td:nth-child(3)',
            partnerHref: 'td:nth-child(3) a@href',
            partnerClass: 'td:nth-child(4)',
            opponent1: 'td:nth-child(5) a:first',
            opponent2: 'td:nth-child(5) a:last',
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
          breadcrumbs: extractBreadcrumbs(data),
          teams: arrayify(data.teams).map(simplifyLinks),
          balance: unique(
            arrayify(data.balances)
              .map(b => b.balance)
              .join('\n')
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
          },
          singles: toArray(data.singles).map(simplifyLinks)
        })
      })
  })
}

module.exports = {
  arrayify,
  assocHistory,
  assoc,
  league,
  team,
  club,
  clubTeams,
  game,
  player
}
