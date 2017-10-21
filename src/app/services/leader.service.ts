import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Leader}  from './../shared/leader';
//import { LEADERS } from './../shared/leaders';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LeaderService {
  /* constructor(private http: Http,
    private processHTTPMsgService: ProcessHTTPMsgService) { } */
  
  constructor(private restangular: Restangular,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    //return Observable.of(LEADERS).delay(2000);
    /* return this.http.get(baseURL + 'leaders')
      .map(res => { return this.processHTTPMsgService.extractData(res); }); */
    return this.restangular.all('leaders').getList();
  }

  getLeader(id: number): Observable<Leader> {
    //return Observable.of(LEADERS.filter((leader) => (leader.id == id))[0]).delay(2000);
    /* return this.http.get(baseURL + 'leaders/' + id)
      .map(res => { return this.processHTTPMsgService.extractData(res); }); */
    return this.restangular.one('leaders', id).get();
  }

  getFeaturedLeader(): Observable<Leader> {
    //return Observable.of(LEADERS.filter((leader) => (leader.featured))[0]).delay(2000);
    /* return this.http.get(baseURL + 'leaders?featured=true')
      .map(res => { return this.processHTTPMsgService.extractData(res)[0]; }); */
    return this.restangular.all('leaders').getList({featured: true})
      .map(leaders => leaders[0]);
  }
}
