import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Data } from '../../providers/data'
import { Loading } from '../../providers/loading'

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
  providers: [Data, Loading]
})
export class GamePage {
  game;
  data = {};

  constructor(private dataService: Data, public navCtrl: NavController, public navParams: NavParams, public loading: Loading) {
    this.game = navParams.data;
  }

  ngOnInit() {
    const loading = this.loading.getInstance();
    loading.present();

    this.dataService.getGame(this.game.href)
      .subscribe(data => {
        this.data = data;
        loading.dismiss();
      })
  }
}
