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
  // options
  showXAxis = true;
  showYAxis = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  assoc = {};

  single = [
    {
        "name": "Germany",
        "value": 1
      },
    {
        "name": "USA",
        "value": 2
      },
    {
        "name": "France",
        "value": 3
      }
  ];

  constructor(private dataService: Data, public navCtrl: NavController) {}

  ngOnInit() {
    this.dataService.getAssoc()
      .subscribe(assoc => this.assoc = assoc)
  }

  onSelect(league) {
    this.navCtrl.push(LeaguePage, league);
  }
}
