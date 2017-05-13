import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { Data } from '../../providers/data'
import { LeaguePage } from '../league/league'

@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
  providers: [Data]
})
export class PlayerPage {
  player
  balances
  data = {}
  active = "overview"
  elo

  constructor(private dataService: Data, public navCtrl: NavController, public navParams: NavParams) {
    this.player = navParams.data
  }

  ngOnInit() {
    this.dataService.getPlayer(this.player.href).subscribe(data => {
      this.data = data
      this.elo = data.elo.data.map(elo => elo.delta)
      console.log('elo', this.elo)
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
