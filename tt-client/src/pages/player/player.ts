import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Data } from '../../providers/data'

@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
  providers: [Data]
})
export class PlayerPage {
  player;
  data = {};

  constructor(private dataService: Data, public navCtrl: NavController, public navParams: NavParams) {
    this.player = navParams.data;
  }

  ngOnInit() {
    this.dataService.getPlayer(this.player.href)
      .subscribe(data => this.data = data)
  }
}
