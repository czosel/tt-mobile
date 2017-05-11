const util = require("util");
const { resolve } = require("url");

const osmosis = require("osmosis");

const host = "http://click-tt.ch";

function getStaticData() {
  return new Promise((res, rej) => {
    osmosis
      .get(
        resolve(
          host,
          "/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/leaguePage?championship=MTTV+16/17&preferredLanguage=German"
        )
      )
      .find("table.matrix td:first-child ul:nth-child(2) li span a")
      .set("league")
      .set({
        href: "@href"
      })
      .set({
        clubs: osmosis
          .follow("@href")
          .find("#content-row2 table.result-set:first tr:not(:first-child)")
          .set({
            rank: "td:nth-child(2)",
            name: "td:nth-child(3)",
            href: "td:nth-child(3) a@href"
          })
          .set({
            players: osmosis
              .find("td:nth-child(3) a")
              .follow("@href")
              .find("#content-row2 table.result-set tr:has(td:nth-child(2) a)")
              .set({
                name: "td:nth-child(2)",
                href: "td:nth-child(2) a@href"
              })
          })
      })
      .error(e => {
        console.error(e);
        rej(e);
      })
      .data(data => {
        res(data);
      });
  });
}

function getAssociation() {
  const url = "/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/leaguePage?championship=MTTV+16/17&preferredLanguage=German";
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .find("#content")
      .set({
        title: "#content-col1 h1",
        leagues: osmosis
          .find("table.matrix td:first-child ul li span")
          .set({
            name: "a",
            href: "a@href"
          })
      })
      .error(e => {
        console.error(e);
        rej(e);
      })
      .data(data => {
        res(data);
      });
  });
}

function getLeague(url) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .find("#content")
      .set({
        title: "#content-col1 h1",
        games: osmosis
          .find("#content-row2 table.result-set:last tr:not(:first-child)")
          .set({
            date: "td:nth-child(2)",
            time: "td:nth-child(3)",
            home: "td:nth-child(6)",
            guest: "td:nth-child(8)",
            result: "td:nth-child(10)",
            href: "td:nth-child(10) a@href"
          }),
        clubs: osmosis
          .find("#content-row2 table.result-set:first tr:not(:first-child)")
          .set({
            rank: "td:nth-child(2)",
            name: "td:nth-child(3)",
            href: "td:nth-child(3) a@href",
            nrOfGames: "td:nth-child(4)",
            score: "td:last-child"
          })
      })
      .error(e => {
        console.error(e);
        rej(e);
      })
      .data(data => {
        res(data);
      });
  });
}

function getClub(url) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .find("#content")
      .set({
        title: "#content-row1 h1",
        players: osmosis
          .find("#content-row2 table.result-set tr:has(td:nth-child(2) a)")
          .set({
            name: "td:nth-child(2)",
            href: "td:nth-child(2) a@href",
            classification: "td:nth-child(3)",
            appearances: "td:nth-child(5)",
            balance: "td:nth-child(8)"
          })
      })
      .error(e => {
        console.error(e);
        rej(e);
      })
      .data(data => {
        res(data);
      });
  });
}

function getGame(url) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .find("#content")
      .set({
        title: "#content-row1 h1",
        matches: osmosis
          .find("table.result-set tr:has(td:nth-child(2) a)")
          .set({
            player1: "td:nth-child(2)",
            player1href: "td:nth-child(2) a@href",
            player2: "td:nth-child(4)",
            player2href: "td:nth-child(4) a@href",
            sets: "td:nth-child(11)",
            game: "td:nth-child(12)"
          })
      })
      .error(e => {
        console.error(e);
        rej(e);
      })
      .data(data => {
        res(data);
      });
  });
}

function getPlayer(url) {
  return new Promise((res, rej) => {
    osmosis
      .get(resolve(host, url))
      .find("#content")
      .set({
        title: "#content-row1 h1",
        classification: "table.result-set:first tr:nth-child(4) td:last",
        singles: osmosis
          .find("table.result-set:nth(3) tr:has(td:nth-child(3) a)")
          .set({
            opponent: "td:nth-child(3)",
            opponentHref: "td:nth-child(3) a@href",
            opponentClass: "td:nth-child(4)",
            sets: "td:nth-child(6)"
          }),
        doubles: osmosis
          .find("table.result-set:last tr:has(td:nth-child(3) a)")
          .set({
            partner: "td:nth-child(3)",
            partnerHref: "td:nth-child(3) a@href",
            partnerClass: "td:nth-child(4)",
            opponent1: "td:nth-child(5) a:first",
            opponent1href: "td:nth-child(5) a:first@href",
            opponent1class: "td:nth-child(6)",
            opponent2: "td:nth-child(5) a:last",
            opponent2href: "td:nth-child(5) a:last@href",
            sets: "td:nth-child(8)",
            game: "td:last-child"
          })
      })
      .error(e => {
        console.error(e);
        rej(e);
      })
      .data(data => {
        res(data);
      });
  });
}

module.exports = {
  getStaticData,
  getAssociation,
  getLeague,
  getClub,
  getGame,
  getPlayer
};
