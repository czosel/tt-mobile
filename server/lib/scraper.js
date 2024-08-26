const { parse, resolve } = require("url");

const R = require("ramda");
const ical = require("ical-generator");
const moment = require("moment");
const models = require("./models");

const osmosis = require("osmosis");

const host = "https://click-tt.ch";

function unique(arr) {
  return arr.filter(
    (entry, index, self) =>
      self.findIndex((t) => {
        return t.data === entry.data && t.team === entry.team;
      }) === index
  );
}

const logger = R.curry((level, prefix, val) => {
  console[level](prefix, val);
  return val;
});

const log = logger("log");
const error = logger("error");

const arrayify = R.unless(Array.isArray, (a) => [a]);

const removeIfNotList = (obj, prop) => {
  return !Array.isArray(obj[prop]) ? R.omit([prop], obj) : obj;
};

const simplifyObject = (prop) => (obj) => ({
  ...obj,
  [prop]: simplify(obj[prop]),
});
const simplifyLinks = simplifyObject("href");

const _extractTime = (time) => time.match(/\d+:\d+/)?.[0];
const extractTime = (obj) => ({
  ...obj,
  time: _extractTime(obj.time),
});

const formatTime = (obj) => ({
  ...obj,
  time: obj.time.split(" ")[0],
});

// strip "/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/" from URL
const simplify = (href) => (href ? href.substring(href.lastIndexOf("/")) : "");

const toArray = (arr) => (Array.isArray(arr) ? arr : []);

const splitTitle = (title) => {
  return title
    ? title
        .split("\n")
        .map((i) => i.trim())
        .filter((i) => !!i)
        .filter((i) => i != "-")
    : [];
};

const asChunks = (games) => {
  const chunks = [];
  games.forEach((g) => {
    if (g.date !== "" || !chunks.length) {
      chunks.push({ date: g.date, games: [] });
    }
    chunks[chunks.length - 1].games.push(g);
  });
  return chunks;
};

const getClubId = (clubHref) =>
  clubHref && Number(parse(clubHref, true).query.club);

const parsePromotion = (promotion) => {
  return {
    Aufsteiger: "up",
    Absteiger: "down",
  }[promotion];
};

function assocHistory({ step }) {
  const url =
    "/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/championshipArchive?federation=STT";
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .find(`table.matrix tr:eq(${step}) td:first-child`)
      .set({
        regular: osmosis.find("a").set("name").set({
          href: "@href",
        }),
      })
      .find(`table.matrix tr:eq(${step}) td:last-child`)
      .set({
        trophy: osmosis.find("a").set("name").set({
          href: "@href",
        }),
      })
      .error(R.pipe(error("assocHistory"), rej))
      .data(({ regular, trophy }) => {
        res({
          regular: toArray(regular).map(simplifyLinks),
          trophy: toArray(trophy).map(simplifyLinks),
        });
      });
  });
}

function assoc({ url }) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .find("#content")
      .set({
        title: "#content-col1 h1",
        leagues: osmosis.find("table.matrix td ul li span").set({
          name: "a",
          href: "a@href",
        }),
      })
      .error(R.pipe(error("assoc"), rej))
      .data(({ title, leagues }) => {
        res({
          title: splitTitle(title)[0],
          leagues: toArray(leagues).map(simplifyLinks),
        });
      });
  });
}

const findBreadcrumbs = (osmosis) =>
  osmosis.find("#breadcrumb a").set("name").set({
    href: "@href",
  });

const extractBreadcrumbs = ({ breadcrumbs }) =>
  toArray(breadcrumbs).map(simplifyLinks).slice(2);

function league({ url }) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .set({
        breadcrumbs: findBreadcrumbs(osmosis),
      })
      .find("#content")
      .set({
        title: "#content-col1 h1",
        clubs: osmosis
          .find(
            'h2:contains("Tabelle"):last ~ table.result-set:first tr:not(:first-child)'
          )
          .set({
            promotion: "td:nth-child(1) img@title",
            rank: "td:nth-child(2)",
            name: "td:nth-child(3)",
            href: "td:nth-child(3) a@href",
            nrOfGames: "td:nth-child(4)",
            games: "td:nth-child(8)",
            balance: "td:nth-child(9)",
            score: "td:last-child",
          }),
        games: osmosis
          .find(
            'h2:contains("Spielplan") ~ table.result-set:first tr:not(:first-child)'
          )
          .set({
            date: "td:nth-child(2)",
            time: "td:nth-child(3)",
            col6: "td:nth-child(6)",
            col7: "td:nth-child(7)",
            col8: "td:nth-child(8)",
            col9: "td:nth-child(9)",
            col10: "td:nth-child(10)",
            col10href: "td:nth-child(10) a@href",
            col11: "td:nth-child(11)",
            col11href: "td:nth-child(11) a@href",
          }),
      })
      .error(error("scraping error in /league, continuing anyway"))
      .data((data) => {
        const titleParts = splitTitle(data.title);
        const games = toArray(data.games)
          .map(simplifyLinks)
          .map(formatTime)
          .map((game) => {
            // Cup leagues have an extra column "Nr."
            if (isNaN(game.col6)) {
              return {
                date: game.date,
                time: game.time,
                home: game.col6,
                guest: game.col8,
                result: game.col10,
                href: simplify(game.col10href),
              };
            }
            return {
              date: game.date,
              time: game.time,
              home: game.col7,
              guest: game.col9,
              result: game.col11,
              href: simplify(game.col11href),
            };
          });

        res({
          assoc: titleParts[0],
          league: titleParts[1],
          title: data.title,
          breadcrumbs: extractBreadcrumbs(data),
          chunks: asChunks(games),
          clubs: toArray(data.clubs)
            .map((club) => ({
              ...club,
              score: club.score.startsWith("zurückgezogen")
                ? "-:-"
                : club.score,
              promotion: parsePromotion(club.promotion),
              games: club.games || "",
              balance: club.balance || "",
            }))
            .map(simplifyLinks),
        });
      });
  });
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
      .find("#content")
      .set({
        lastMatches: osmosis
          .find(
            "//table[@class='result-set'][count(preceding-sibling::*[1][self::h2][contains(.,'Rückschau')]) > 0]//tr"
          )
          .set({
            date: "td:nth-child(2)",
            time: "td:nth-child(3)",
            league: "td:nth-child(6)",
            home: "td:nth-child(7)",
            guest: "td:nth-child(9)",
            href: "td:nth-child(11) a@href",
            result: "td:nth-child(11)",
          }),
        nextMatches: osmosis
          .find(
            "//table[@class='result-set'][count(preceding-sibling::*[1][self::h2][contains(.,'Vorschau')]) > 0]//tr"
          )
          .set({
            date: "td:nth-child(2)",
            time: "td:nth-child(3)",
            league: "td:nth-child(6)",
            home: "td:nth-child(7)",
            guest: "td:nth-child(9)",
          }),
      })
      .error(error("scraping error in /club, continuing anyway"))
      .data((data) => {
        res({
          lastMatches: asChunks(
            toArray(data.lastMatches)
              .filter((m) => m.time)
              .map(simplifyLinks)
              .map(extractTime)
          ),
          nextMatches: asChunks(
            toArray(data.nextMatches)
              .filter((m) => !m.result && m.time)
              .map(extractTime)
          ),
          // deprecated
          chunks: asChunks(arrayify(data.lastMatches).map(simplifyLinks)),
        });
      });
  });
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
      .find("#content")
      .set({
        title: "#content-row1 h1",
        teams: osmosis
          .find("#content-row1 table.result-set tr:has(td:nth-child(2) a)")
          .set({
            name: "td:nth-child(1)",
            league: "td:nth-child(2)",
            href: "td:nth-child(2) a@href",
            captain: "td:nth-child(3)",
            rank: "td:nth-child(4)",
            points: "td:nth-child(5)",
          }),
      })
      .error(error("scraping error in /clubTeams, continuing anyway"))
      .data((data) => {
        const name = splitTitle(data.title)[0];
        models.Club.forge({ id })
          .save({ name })
          .catch(() => {
            models.Club.forge().save({ id, name });
          });

        res({
          name,
          teams: toArray(data.teams).map(simplifyLinks),
        });
      });
  });
}

function team({ url, format }, expressRes) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .set({
        breadcrumbs: findBreadcrumbs(osmosis),
      })
      .find("#content")
      .do(
        osmosis.set({
          title: "#content-row1 h1",
          club: "#content-row1 table.result-set tr:first-child td a",
          clubHref: "#content-row1 table.result-set tr:first-child td a@href",
          locations:
            "#content-row1 table.result-set tr:first-child td:last-child:html",
        }),
        osmosis.set({
          players: osmosis
            .find("#content-row2 table.result-set tr:has(td:nth-child(2) a)")
            .set({
              name: "td:nth-child(2)",
              href: "td:nth-child(2) a@href",
              classification: "td:nth-child(3)",
              appearances: "td:nth-child(5)",
              balance: "td:nth-child(8)",
            }),
        }),
        osmosis.set({
          games: osmosis
            .find(
              `#content-row2 table.result-set:nth(1) tr:not(:first-child),
             #content-row2 table.result-set:nth(0) tr:not(:first-child)`
            )
            .set({
              date: "td:nth-child(2)",
              time: "td:nth-child(3)",
              home: "td:nth-child(6)",
              guest: "td:nth-child(8)",
              result: "td:nth-child(10)",
              href: "td:nth-child(10) a@href",
            }),
        })
      )
      .error(error("scraping error in /team, continuing anyway"))
      .data((data) => {
        if (format === "ics") {
          const cal = ical({ domain: "tt-mobile.ch", name: data.club });
          const league = `(${extractBreadcrumbs(data)[1]?.name || ""})`;
          cal.events(
            toArray(data.games)
              .map(simplifyLinks)
              .map((game) => ({
                ...game,
                isHome: !game.guest.includes(data.club),
              }))
              .map((game) => {
                const start = moment(
                  `${game.date} ${game.time}`,
                  "DD.MM.YYYY H:m"
                );
                return {
                  start: start.toDate(),
                  end: start.add(3, "h").toDate(),
                  summary: `${game.home} - ${game.guest} ${league}`,
                  description: game.isHome ? "Heimspiel" : "Auswärtsspiel",
                };
              })
          );

          return cal.serve(expressRes);
        }

        const games = toArray(data.games)
          .map(simplifyLinks)
          .map(formatTime)
          .map((game) => ({
            ...game,
            opponent: game.guest.includes(data.club) ? game.home : game.guest,
            isHome: !game.guest.includes(data.club),
          }));
        res({
          ...data,
          games,
          locations: extractLocations(data.locations),
          league: splitTitle(data.title)[1],
          breadcrumbs: extractBreadcrumbs(data),
          name: splitTitle(data.title)[2],
          clubId: getClubId(data.clubHref),
          players: toArray(data.players).map(simplifyLinks),
        });
      });
  });
}

function extractLocations(html) {
  const rows = splitTitle(html);
  const result = [];
  for (const [i, row] of rows.entries()) {
    if (row.includes("Matchlocation")) {
      result.push(rows[i + 1]);
    }
  }
  return result.map((row) => row.split("<br>").join(", "));
}

const player1Lens = R.lensProp("player1");
const matchesLens = R.lensProp("matches");
const trimPlayers = R.over(
  matchesLens,
  R.map(R.over(player1Lens, R.toUpper()))
);

function game({ url }) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .set({
        breadcrumbs: findBreadcrumbs(osmosis),
      })
      .find("#content")
      .set({
        title: "#content-row1 h1:html",
        matches: osmosis
          .find("table.result-set tr:has(td:nth-child(2) a)")
          .set({
            player1: "td:nth-child(2)",
            player1href: "td:nth-child(2) a@href",
            player1class: "td:nth-child(3)",
            player2: "td:nth-child(4)",
            player2href: "td:nth-child(4) a@href",
            player2class: "td:nth-child(5)",
            s1: "td:nth-child(6)",
            s2: "td:nth-child(7)",
            s3: "td:nth-child(8)",
            s4: "td:nth-child(9)",
            s5: "td:nth-child(10)",
            sets: "td:nth-child(11)",
            game: "td:nth-child(12)",
          }),
        summary: osmosis.find("table.result-set tr:last").set({
          balls: "td:nth(2)",
          sets: "td:nth(3)",
          game: "td:last",
        }),
      })
      .error(error("scraping error in /game, continuing anyway"))
      .data((data) => {
        const split = data.title.split("<br>").map((i) => i.trim());
        const lastParts = splitTitle(split[2]);
        res({
          ...data,
          breadcrumbs: extractBreadcrumbs(data),
          assoc: split[0],
          league: split[1],
          home: lastParts[0],
          guest: lastParts[1],
          date: lastParts[2]?.split(",")[1],
          time: lastParts[3],
          matches: toArray(data.matches).map((match) => ({
            ...match,
            player1href: simplify(match.player1href),
            player2href: simplify(match.player2href),
          })),
        });
      });
  });
}

function player({ url }) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .set({
        breadcrumbs: findBreadcrumbs(osmosis),
      })
      .find("#content")
      .set({
        title: "#content-row1 h1",
        club: "#content-row1 > table.result-set:first tr:first-child td:last a",
        clubHref:
          "#content-row1 > table.result-set:first tr:first-child td:last a@href",
        classification:
          "#content-row1 > table.result-set:first tr:nth-child(4) td:last",
        seasons: osmosis
          .find("table.result-set:nth(1) tr:first-child td a")
          .set("name")
          .set({
            href: "@href",
          }),
        teams: osmosis
          .find("table.result-set table.result-set tr:nth-child(2) > td a")
          .set("name")
          .set({
            href: "@href",
          }),
        balances: osmosis
          .find(
            "table.result-set table.result-set tr:last-child > td:last-child"
          )
          .set("balance"),
        singles: osmosis
          .find(
            "#content-row1 > table.result-set:nth(2) tr:has(td:nth-child(3) a)"
          )
          .set({
            opponent: "td:nth-child(3)",
            href: "td:nth-child(3) a@href",
            classification: "td:nth-child(4)",
            sets: "td:nth-child(6)",
          }),
        doubles: osmosis
          .find(
            "#content-row1 > table.result-set:nth(3) tr:has(td:nth-child(3) a)"
          )
          .set({
            partner: "td:nth-child(3)",
            partnerHref: "td:nth-child(3) a@href",
            partnerClass: "td:nth-child(4)",
            opponent1: "td:nth-child(5) a:first",
            opponent2: "td:nth-child(5) a:last",
            sets: "td:nth-child(8)",
            game: "td:last-child",
          }),
        eloHref: "ul.content-tabs > li:first-child a@href",
      })
      .error(error("scraping error in /player, continuing anyway"))
      .data((data) => {
        res({
          ...data,
          name: splitTitle(data.title)[1],
          clubId: getClubId(data.clubHref),
          breadcrumbs: extractBreadcrumbs(data),
          seasons: arrayify(data.seasons).map(simplifyLinks),
          teams: arrayify(data.teams)
            .map(simplifyLinks)
            .filter((t) => t.href),
          balances: unique(
            arrayify(data.balances)
              .map((b) => b.balance)
              .join("\n")
              .split("\n")
              .filter((str) => str.trim())
              .map((str) => ({
                team: str.substr(0, str.indexOf(":")).trim(),
                data: str.substr(str.indexOf(":") + 1).trim(),
              }))
              .filter((e) => e.team.trim())
          ),
          singles: toArray(data.singles).map(simplifyLinks),
          doubles: toArray(data.doubles).map(simplifyObject("partnerHref")),
          eloHref: simplify(data.eloHref),
        });
      });
  });
}

function elo({ url }) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .find("#content")
      .set({
        playerHref: "ul.content-tabs > li:last-child a@href",
        start: "table tr:has(td > b:contains('Elo-Wert')):first td:last",
        endDate:
          "table.result-set.table-layout-fixed:first tbody tr:first td:first-child",
        startDate:
          "table.result-set.table-layout-fixed:last tbody tr:last td:first-child",
        data: osmosis.find("table.result-set.table-layout-fixed tbody tr").set({
          myElo: "td:nth-child(3)",
          opponentElo: "td:nth-child(5)",
          won: "td:nth-child(6):has(img)",
          delta: "td:last-child",
        }),
      })
      .error(error("scraping error in /elo, continuing anyway"))
      .data((data) => {
        let current = parseInt(data.start);
        const start = current;
        let result = [start];

        arrayify(data.data)
          .filter((row) => row.delta)
          .forEach((row) => {
            current = current - parseFloat(row.delta.replace(",", "."));
            result.push(current);
          });
        result.reverse();
        current = result[result.length - 1];
        // preview: elo values for both players, but no delta yet on click-tt
        arrayify(data.data)
          .filter((row) => !row.delta && row.myElo && row.opponentElo)
          .reverse()
          .forEach((row) => {
            current =
              current +
              eloDiff(row.myElo, row.opponentElo, row.won !== undefined);
            result.push(current);
          });

        res({
          ...data,
          playerHref: simplify(data.playerHref),
          start,
          data: result.map((x) => Math.round(100 * x) / 100),
        });
      });
  });
}

function eloDiff(eloA, eloB, won = true) {
  const pToWin = 1 / (1 + 10 ** ((eloB - eloA) / 200));
  return won ? 15 * (1 - pToWin) : -15 * pToWin;
}

function me({ url }) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .set({
        breadcrumbs: findBreadcrumbs(osmosis),
      })
      .find("#content")
      .set({
        title: "#content-row1 h1",
        club: "#content-row1 > table.result-set:first tr:first-child td:last a",
        clubHref:
          "#content-row1 > table.result-set:first tr:first-child td:last a@href",
        classification:
          "#content-row1 > table.result-set:first tr:nth-child(4) td:last",
        teams: osmosis
          .find("table.result-set table.result-set tr:nth-child(2) > td a")
          .set("name")
          .set({
            href: "@href",
          }),
        balances: osmosis
          .find(
            "table.result-set table.result-set tr:last-child > td:last-child"
          )
          .set("balance"),
      })
      .error(error("scraping error in /me, continuing anyway"))
      .data((data) => {
        res({
          ...data,
          name: splitTitle(data.title)[1],
          clubId: getClubId(data.clubHref),
          breadcrumbs: extractBreadcrumbs(data),
          teams: arrayify(data.teams)
            .map(simplifyLinks)
            .filter((t) => t.href),
          balance: unique(
            arrayify(data.balances)
              .map((b) => b.balance)
              .join("\n")
              .split("\n")
              .filter((str) => !!str.trim())
              .map((str) => ({
                team: str.substr(0, str.indexOf(":")).trim(),
                data: str.substr(str.indexOf(":") + 1).trim(),
              }))
          ),
        });
      });
  });
}

function _searchBy(prop, term) {
  return new Promise((res, rej) => {
    osmosis
      .post(resolve(host, `/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/eloFilter`), {
        [prop]: term,
        WOSubmitAction: "eloFilter",
        federation: "STT",
        rankingDate: "10.07.2024",
      })
      .set({
        [prop]: osmosis.find("table.result-set > tbody > tr").set({
          name: "td:first-child a",
          href: "td:first-child a@href",
          club: "td:nth-child(3)",
          elo: "td:nth-child(4)",
        }),
      })
      .error(R.pipe(error("search"), rej))
      .data((data) =>
        res({
          [prop]: arrayify(data[prop]).filter(Boolean).map(simplifyLinks),
        })
      );
  });
}

function search(term) {
  return Promise.all([
    _searchBy("lastname", term),
    _searchBy("firstname", term),
  ]).then((values) => ({
    ...values[0],
    ...values[1],
  }));
}

function regionSchedule({ championship, date }) {
  const monday = date.startOf("isoWeek");
  const dayOfYear = monday.format("DDD");
  const month = monday.format("M") - 1;

  return new Promise((res, rej) => {
    osmosis
      .post(
        resolve(
          host,
          `/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/regionMeetingFilter`
        ),
        {
          championship,
          dayOfYear,
          month,
          filterHomeGuestBackup: false,
        }
      )
      .set({
        games: osmosis.find("table.result-set > tr:not(:first-child)").set({
          date: "td:nth-child(2)",
          time: "td:nth-child(3)",
          col5: "td:nth-child(5)",
          col6: "td:nth-child(6)",
          col7: "td:nth-child(7)",
          col8: "td:nth-child(8)",
          col9: "td:nth-child(9)",
          col10: "td:nth-child(10)",
          col10href: "td:nth-child(10) a@href",
          col11: "td:nth-child(11)",
          col11href: "td:nth-child(11) a@href",
        }),
      })
      .error(error("scraping error in /regionSchedule, continuing anyway"))
      .data((data) => {
        data.games = (data.games || []).map((game) => {
          // sometimes the "Runde" column is missing
          if (isNaN(game.col5)) {
            return {
              date: game.date,
              time: game.time,
              league: game.col5,
              home: game.col6,
              guest: game.col8,
              result: game.col10,
              resultHref: simplify(game.col10href),
            };
          }
          return {
            date: game.date,
            time: game.time.match(/[0-9]{2}:[0-9]{2}/)[0],
            league: game.col6,
            home: game.col7,
            guest: game.col9,
            result: game.col11,
            resultHref: simplify(game.col11href),
          };
        });
        const chunks = asChunks(toArray(data.games).filter(Boolean));
        return res({ chunks });
      });
  });
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
  player,
  elo,
  me,
  search,
  regionSchedule,
};
