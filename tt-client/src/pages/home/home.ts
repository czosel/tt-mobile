import { Component } from '@angular/core';

import { Data } from '../../providers/data'
import { NavController } from 'ionic-angular';
import { AssocPage } from '../assoc/assoc';
import { Loading } from '../../providers/loading'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Data, Loading]
})
export class HomePage {
  associations = {};

  constructor(private dataService: Data, public navCtrl: NavController, public loading: Loading) {}

  ngOnInit() {
    const loading = this.loading.getInstance();
    loading.present();

    this.dataService.getAssociations()
      .subscribe(data => {
        this.associations = data;
        loading.dismiss();
      })
  }

  onSelect(assoc) {
    this.navCtrl.push(AssocPage, assoc);
  }
}
