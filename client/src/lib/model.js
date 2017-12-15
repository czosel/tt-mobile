const API_ORIGIN = 'http://localhost:3020'
const asJson = r => r.json()

const get = endpoint => href =>
  fetch(`${API_ORIGIN}/${endpoint}?url=${encodeURIComponent(href)}`).then(
    asJson
  )
export default function model() {
  return {
    api: {
      assoc: get('assoc'),
      league: get('league'),
      team: get('team'),
      player: get('player'),
      game: get('game'),
      assocHistory(step) {
        return fetch(`${API_ORIGIN}/assocHistory?step=${step}`).then(asJson)
      }
    }
  }
}
