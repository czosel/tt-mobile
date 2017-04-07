import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-player',
  templateUrl: 'player.html'
})
export class PlayerPage {
  player;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.player = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerPage');
  }
}
