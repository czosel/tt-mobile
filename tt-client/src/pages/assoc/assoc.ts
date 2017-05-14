import { Component } from '@angular/core';

import { Data } from '../../providers/data'
import { NavController, NavParams } from 'ionic-angular';
import { LeaguePage } from '../league/league';
import { Loading } from '../../providers/loading'

@Component({
  selector: 'page-assoc',
  templateUrl: 'assoc.html',
  providers: [Data, Loading]
})
export class AssocPage {
  assoc;
  data = {};

  constructor(private dataService: Data, public navCtrl: NavController, public navParams: NavParams, public loading: Loading) {
    this.assoc = navParams.data;
  }

  ngOnInit() {
    const loading = this.loading.getInstance();
    loading.present();

    this.dataService.getAssoc(this.assoc.href)
      .subscribe(assoc => {
        this.data = assoc;
        loading.dismiss();
      })
  }

  onSelect(league) {
    this.navCtrl.push(LeaguePage, league);
  }
}
