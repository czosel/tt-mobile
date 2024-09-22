export const API_ORIGIN = process.env.PREACT_APP_API;
const asJson = (r) => r.json();

const isBrowser = () => typeof window !== "undefined";
const me = () => isBrowser() && localStorage.getItem("me");
const isIOS = () =>
  isBrowser() &&
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !window.MSStream;

export const get = (endpoint) => async (href) => {
  const response = await fetch(
    `${API_ORIGIN}/${endpoint}?url=${encodeURIComponent(href)}`
  );
  if (response.ok) {
    return await response.json();
  }
  throw new Error(await response.text());
};

export const icalHref = (href) => {
  let origin = API_ORIGIN;
  // webcal is not supported on Android devices
  if (isIOS()) {
    origin = origin.replace(/https?/, "webcal");
  }
  return `${origin}/team?format=ics&url=${encodeURIComponent(href)}`;
};

export default function model() {
  return {
    me,
    api: {
      assoc: get("assoc"),
      league: get("league"),
      team: get("team"),
      player: get("player"),
      elo: get("elo"),
      me: () => {
        const href = me();
        return href ? get("me")(href) : null;
      },
      game: get("game"),
      assocHistory(step) {
        return fetch(`${API_ORIGIN}/assocHistory?step=${step}`).then(asJson);
      },
      club(id) {
        return fetch(`${API_ORIGIN}/club/${id}`).then(asJson);
      },
      clubTeams(id) {
        return fetch(`${API_ORIGIN}/club-teams/${id}`).then(asJson);
      },
    },
  };
}
