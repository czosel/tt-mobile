import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlayerPage } from '../player/player';
import { Data } from '../../providers/data'

@Component({
  selector: 'page-club',
  templateUrl: 'club.html',
  providers: [Data]
})
export class ClubPage {
  club;
  data = {};

  constructor(private dataService: Data, public navCtrl: NavController, public navParams: NavParams) {
    this.club = navParams.data;
  }

  ngOnInit() {
    this.dataService.getClub(this.club.href)
      .subscribe(data => this.data = data)
  }

  onSelect(player) {
    this.navCtrl.push(PlayerPage, player);
  }
}
