import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private heads = new HttpHeaders();

  constructor( private http: HttpClient ) { }

  getToken() {
    return localStorage.getItem('token');
  }

  getLogs(num, fw, lw, fm, lm) {
    let headers = this.heads.set('token', this.getToken());

    if(num === 0) {
      return this.http.get<any>(`https://self-organize-node.herokuapp.com/api/personal`, { headers });
    } else if(num === 1) {
      return this.http.get<any>(`https://self-organize-node.herokuapp.com/api/personal?gte=${fw}&lte=${lw}`, { headers });
    } else if(num === 2) {
      return this.http.get<any>(`https://self-organize-node.herokuapp.com/api/personal?gte=${fm}&lte=${lm}`, { headers });
    }
  }


}
