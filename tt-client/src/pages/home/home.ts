import { Component } from '@angular/core';

import { Data } from '../../providers/data'
import { NavController } from 'ionic-angular';
import { LeaguePage } from '../league/league';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Data]
})
export class HomePage {
  assoc = {};

  constructor(private dataService: Data, public navCtrl: NavController) {}

  ngOnInit() {
    this.dataService.getAssoc()
      .subscribe(assoc => this.assoc = assoc)
  }

  onSelect(league) {
    this.navCtrl.push(LeaguePage, league);
  }
}
