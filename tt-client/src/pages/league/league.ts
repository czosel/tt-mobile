import { Component } from '@angular/core';

import { Data } from '../../providers/data'
import { NavController, NavParams } from 'ionic-angular';
import { ClubPage } from '../club/club';
import { GamePage } from '../game/game';

@Component({
  selector: 'page-league',
  templateUrl: 'league.html',
  providers: [Data]
})
export class LeaguePage {
  league;
  data = {};
  active = "table";

  constructor(private dataService: Data, public navCtrl: NavController, public navParams: NavParams) {
    this.league = navParams.data;
  }

  ngOnInit() {
    this.dataService.getLeague(this.league.href)
      .subscribe(league => this.data = league)
  }

  onSelect(club) {
    console.log('selected', club);
    this.navCtrl.push(ClubPage, club);
  }

  openGame(game) {
    this.navCtrl.push(GamePage, game);
  }

  homeWinner(game) {
    const points = game.result.split(":");
    return points[0] > points[1];
  }

  guestWinner(game) {
    const points = game.result.split(":");
    return points[0] < points[1];
  }

}
