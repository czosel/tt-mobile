import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class Loading {

  constructor(public loadingCtrl: LoadingController) {}

  getInstance() {
    return this.loadingCtrl.create({
      content: 'Lädt ...',
      spinner: 'crescent'
    });
  }

}
