const API_ORIGIN = 'http://localhost:3020'
const asJson = r => r.json()

const get = endpoint => href =>
  fetch(`${API_ORIGIN}/${endpoint}?url=${encodeURIComponent(href)}`).then(
    asJson
  )

export const icalHref = href =>
  `${API_ORIGIN}/team?format=ics&url=${encodeURIComponent(href)}`

export default function model() {
  return {
    me() {
      return localStorage.getItem('me')
    },
    api: {
      assoc: get('assoc'),
      league: get('league'),
      team: get('team'),
      player: get('player'),
      me: () => {
        const href = localStorage.getItem('me')
        return href ? get('me')(href) : null
      },
      game: get('game'),
      assocHistory(step) {
        return fetch(`${API_ORIGIN}/assocHistory?step=${step}`).then(asJson)
      },
      club(id) {
        return fetch(`${API_ORIGIN}/club/${id}`).then(asJson)
      },
      clubTeams(id) {
        return fetch(`${API_ORIGIN}/club-teams/${id}`).then(asJson)
      }
    }
  }
}
