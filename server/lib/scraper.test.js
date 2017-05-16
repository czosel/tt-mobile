const test = require('tape')
const scraper = require('./scraper')

// helpers
function isClass(str) {
  return str.match(/^[A-Z][1-2][0-9]$/) || str.match(/^[A-Z][1-9]$/)
}

function isSets(str) {
  return ['0:3', '1:3', '2:3', '3:2', '3:1', '3:0'].indexOf(str) > -1
}

function isUrl(str) {
  return (
    str && str.indexOf('/') === 0 && str.length > 10 && str.indexOf(' ') === -1
  )
}

test('class regex works', t => {
  t.ok(isClass('A20'))
  t.ok(isClass('D1'))
  t.notok(isClass('A00'))
  t.notok(isClass('a00'))
  t.notok(isClass('Z31'))
  t.notok(isClass('A200'))
  t.notok(isClass('A'))
  t.end()
})

test('isSets', t => {
  t.ok(isSets('2:3'))
  t.notok(isSets('3:3'))
  t.end()
})

test('isUrl', t => {
  t.ok(
    isUrl(
      '/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/playerPortrait?federation=STT&season=2016%2F17&person=1714709&club=33123'
    )
  )
  t.notok(isUrl('hello'))
  t.notok(isUrl('/foo/ barasdslda'))
  t.end()
})

test('player response', async t => {
  const player = await scraper.getPlayer(
    '/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/playerPortrait?federation=STT&season=2016%2F17&person=1714709&club=33123'
  )
  t.ok(isClass(player.classification), 'classification')
  t.equal(typeof player.title, 'string', 'title')
  t.equal(typeof player.balance[0].team, 'string', 'balance:team')
  t.equal(typeof player.balance[0].data, 'string', 'balance:data')

  t.equal(typeof player.singles[0].opponent, 'string', 'singles:opponent')
  t.ok(isUrl(player.singles[0].opponentHref), 'singles:opponentHref')
  t.ok(isSets(player.singles[0].sets))
  t.ok(isClass(player.singles[0].opponentClass))

  t.ok(player.teams)
  t.ok(isUrl(player.teams[0].href))
  t.ok(player.teams[0].name)

  t.equal(typeof player.elo.data[0].delta, 'number', 'elo')
  t.equal(typeof player.elo.start, 'number', 'elostart')
  t.end()
})

test('associations', async t => {
  const response = await scraper.getAssociations()
  t.equal(typeof response.title, 'string')
  t.ok(isUrl(response.associations[0].href))
  t.equal(typeof response.associations[0].name, 'string')
  t.end()
})

test('game', async t => {
  // Royal Bern
  const response = await scraper.getGame(
    '/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupMeetingReport?meeting=6358643&championship=MTTV+16%2F17&group=199330'
  )
  t.equal(typeof response.title, 'string')
  t.equal(typeof response.summary.game, 'string')
  t.equal(typeof response.summary.sets, 'string')
  t.end()
})
