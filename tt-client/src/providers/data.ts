import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const host = 'http://localhost:3000';

@Injectable()
export class Data {

  constructor(public http: Http) {}


  getLeague() {
    return this.http.get(host + "/league")
      .map(this.extractData);
  }

  getClub(url) {
    return this.http.get(host + "/club/" + encodeURIComponent(url))
      .map(this.extractData);
  }

  getGame(url) {
    return this.http.get(host + "/game/" + encodeURIComponent(url))
      .map(this.extractData);
  }

  private extractData(res) {
    return res.json();
  }
}
