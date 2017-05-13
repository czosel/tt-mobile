import { Injectable, Pipe } from '@angular/core';
import { Elo } from '../providers/elo'

@Pipe({
  name: 'elo'
})
@Injectable()
export class EloPipe {
  constructor(public elo: Elo) {}

  transform(value) {
    return value ? this.elo.getClass(value) : '';
  }
}
