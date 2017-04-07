import { Component } from '@angular/core';

import { Data } from '../../providers/data'
import { NavController } from 'ionic-angular';
import { ClubPage } from '../club/club';
import { GamePage } from '../game/game';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Data]
})
export class HomePage {
  league = {};

  constructor(private dataService: Data, public navCtrl: NavController) {}

  ngOnInit() {
    this.getLeague();
  }

  getLeague() {
    this.dataService.getLeague()
      .subscribe(league => this.league = league)
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
