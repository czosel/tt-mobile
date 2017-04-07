import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Data } from '../../providers/data'

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
  providers: [Data]
})
export class GamePage {
  game;
  data = {};

  constructor(private dataService: Data, public navCtrl: NavController, public navParams: NavParams) {
    this.game = navParams.data;
  }

  ngOnInit() {
    this.dataService.getGame(this.game.href)
      .subscribe(data => this.data = data)
  }
}
