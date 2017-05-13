import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlayerPage } from '../player/player';
import { Data } from '../../providers/data'
import { Loading } from '../../providers/loading'

@Component({
  selector: 'page-club',
  templateUrl: 'club.html',
  providers: [Data, Loading]
})
export class ClubPage {
  club;
  data = {};

  constructor(private dataService: Data, public navCtrl: NavController, public navParams: NavParams, public loading: Loading) {
    this.club = navParams.data;
  }

  ngOnInit() {
    const loading = this.loading.getInstance();
    loading.present();
    this.dataService.getClub(this.club.href)
      .subscribe(data => {
        this.data = data
        loading.dismiss();
      })
  }

  onSelect(player) {
    this.navCtrl.push(PlayerPage, player);
  }
}
