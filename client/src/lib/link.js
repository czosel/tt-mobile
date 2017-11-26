const map = {
  groupPage: 'league',
  leaguePage: 'assoc',
  teamPortrait: 'club',
  playerPortrait: 'player',
  groupMeetingReport: 'game'
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
  const route = map[Object.keys(map).find(key => href.includes(key))]
  return `/${route}/${encodeURIComponent(href)}/${tab}`
}
