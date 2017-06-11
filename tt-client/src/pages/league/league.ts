import { Component } from '@angular/core';

import { Data } from '../../providers/data'
import { Loading } from '../../providers/loading'
import { NavController, NavParams } from 'ionic-angular';
import { ClubPage } from '../club/club';
import { GamePage } from '../game/game';

@Component({
  selector: 'page-league',
  templateUrl: 'league.html',
  providers: [Data, Loading]
})
export class LeaguePage {
  league;
  data = {};
  active = "table";
  hasTable = true;

  constructor(private dataService: Data, public navCtrl: NavController, public navParams: NavParams, public loading: Loading) {
    this.league = navParams.data;
  }

  ngOnInit() {
    const loading = this.loading.getInstance();
    loading.present();

    this.dataService.getLeague(this.league.href)
      .subscribe(league => {
        this.data = league;
        this.hasTable = !!league.clubs
        this.active = this.hasTable ? 'table' : 'fixture'
        loading.dismiss();
      });
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
