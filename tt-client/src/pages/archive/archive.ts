import { Component } from '@angular/core';
import { Data } from '../../providers/data';
import { NavController, NavParams } from 'ionic-angular';
import { AssocPage } from '../assoc/assoc';
import { Loading } from '../../providers/loading'

@Component({
  selector: 'page-archive',
  templateUrl: 'archive.html',
  providers: [Data, Loading]
})
export class ArchivePage {
  season;
  associations = {};

  constructor(private dataService: Data, public navCtrl: NavController, public navParams: NavParams, public loading: Loading) {
    console.log(navParams.data);
    this.season = navParams.data;
  }

  ngOnInit() {
    const loading = this.loading.getInstance();
    loading.present();

    this.dataService.getAssocHistory(this.season.step)
      .subscribe(data => {
        this.associations = data;
        loading.dismiss();
      })
  }

  onSelect(assoc) {
    this.navCtrl.push(AssocPage, assoc);
  }

}
