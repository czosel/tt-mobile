import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { Data } from '../../providers/data'
import { LeaguePage } from '../league/league'
import { Loading } from '../../providers/loading'

@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
  providers: [Data, Loading]
})
export class PlayerPage {
  player
  balances
  data = {}
  active = "overview"
  elo

  constructor(private dataService: Data, public navCtrl: NavController, public navParams: NavParams, public loading: Loading) {
    this.player = navParams.data
  }

  ngOnInit() {
    const loading = this.loading.getInstance();
    loading.present();

    this.dataService.getPlayer(this.player.href).subscribe(data => {
      this.data = data
      this.elo = data.elo.data.map(elo => elo.delta)
      loading.dismiss()
    })
  }

  openPlayer(match) {
    this.navCtrl.push(PlayerPage, {
      name: match.opponent,
      href: match.opponentHref
    })
  }

  openLeague(league) {
    this.navCtrl.push(LeaguePage, league)
  }
}
