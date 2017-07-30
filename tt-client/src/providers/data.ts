import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const host = 'http://localhost:3020';

@Injectable()
export class Data {

  constructor(public http: Http) {}

  getAssociations() {
    return this.http.get(host + "/associations")
      .map(this.extractData);
  }

  getAssocHistory(step) {
    return this.http.get(host + "/assocHistory?step=" + step)
      .map(this.extractData);
  }

  getAssoc(url) {
    return this.http.get(host + "/assoc?url=" + encodeURIComponent(url))
      .map(this.extractData);
  }

  getLeague(url) {
    return this.http.get(host + "/league?url=" + encodeURIComponent(url))
      .map(this.extractData);
  }

  getClub(url) {
    return this.http.get(host + "/club?url=" + encodeURIComponent(url))
      .map(this.extractData);
  }

  getGame(url) {
    return this.http.get(host + "/game?url=" + encodeURIComponent(url))
      .map(this.extractData);
  }

  getPlayer(url) {
    return this.http.get(host + "/player?url=" + encodeURIComponent(url))
      .map(this.extractData);
  }

  private extractData(res) {
    return res.json();
  }
}
