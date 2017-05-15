import { Component, Input } from '@angular/core';

@Component({
  selector: 'elo-score',
  templateUrl: 'elo-score.html'
})
export class EloScoreComponent {
  style
  _score = ""

  @Input()
  set score(score) {
    if (score && score.length <= 3) {
      this._score = score
      const angle = parseInt(score.substr(1)) / 20 * 360 + 180
      this.style = {
        'background-color': `hsl(${angle}, 100%, 40%)`
      }
    }
  }
}
