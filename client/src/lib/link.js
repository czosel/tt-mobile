const map = {
  groupPage: 'league',
  leaguePage: 'assoc',
  teamPortrait: 'team',
  playerPortrait: 'player',
  elo: 'player',
  groupMeetingReport: 'game',
  clubInfoDisplay: 'club',
  clubMeetingReport: 'game'
}

/**
 * Translate a click-TT url into a client URL, e.g
 * "/groupPage?championship=MTTV+17%2F18&group=201630"
 * -> "/club/groupPage?championship=MTTV+17%2F18&group=201630"
 */
export default function clientHref(href, tab = '') {
  if (!href) {
    return undefined
  }
  if (typeof href === 'string') {
    const route = map[Object.keys(map).find(key => href.includes(key))]
    return `/${route}/${encodeURIComponent(href)}/${tab}`
  }
  if (href.clubId) {
    return `/club/${href.clubId}/${tab}`
  }
}
