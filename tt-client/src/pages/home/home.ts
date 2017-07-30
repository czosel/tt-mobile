import { Component } from '@angular/core';

import { Data } from '../../providers/data';
import { NavController } from 'ionic-angular';
import { AssocPage } from '../assoc/assoc';
import { ArchivePage } from '../archive/archive';
import { Loading } from '../../providers/loading'

const spaceToPlus = str => str.replace(' ', '+');

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Data, Loading]
})
export class HomePage {
  seasons = [
    { step: 0, year: '16/17' },
    { step: 1, year: '15/16' },
    { step: 2, year: '14/15' },
    { step: 1, year: '13/14' },
    { step: 1, year: '12/13' }
  ];

  associations = ['STT', 'AGTT', 'ANJTT', 'ATTT', 'AVVF', 'MTTV', 'NWTTV']
  translations = {STT: 'Nationalliga'}

  trophies = ['Schweizer Cup', 'AGTT Cup', 'ANJTT Cup', 'ATTT Cup', 'AVVF Coupe', 'NWTTV Cup', 'OTTV Cup', 'TTVI Cup', 'MTTV Cup'];

  constructor(public navCtrl: NavController) {}

  select(name) {
    this.navCtrl.push(AssocPage, {
      name: `${name} 2017/18`,
      href: `/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/leaguePage?championship=${spaceToPlus(name)}+17%2F18`
    });
  }

  /**
   * Open the archive page
   *
   * @param step index describing how many seasons to go back (0-based)
   */
  openArchive(season) {
    this.navCtrl.push(ArchivePage, season);
  }
}
