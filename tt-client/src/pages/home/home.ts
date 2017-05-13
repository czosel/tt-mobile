import { Component } from '@angular/core';

import { Data } from '../../providers/data'
import { NavController } from 'ionic-angular';
import { LeaguePage } from '../league/league';
import { Loading } from '../../providers/loading'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Data, Loading]
})
export class HomePage {
  assoc = {};

  constructor(private dataService: Data, public navCtrl: NavController, public loading: Loading) {}

  ngOnInit() {
    const loading = this.loading.getInstance();
    loading.present();

    this.dataService.getAssoc()
      .subscribe(assoc => {
        this.assoc = assoc;
        loading.dismiss();
      })
  }

  onSelect(league) {
    this.navCtrl.push(LeaguePage, league);
  }
}
