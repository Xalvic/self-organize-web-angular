import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  private heads = new HttpHeaders();

  constructor( private http: HttpClient ) { }

  getToken() {
    return localStorage.getItem('token');
  }

  login(data) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(
      `https://self-organize-node.herokuapp.com/api/user/login`,
      JSON.stringify(data),
      {
        headers,
      }
      );
  }

  postLog(data) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.getToken(),
    });

    return this.http.post<any>(
      `https://self-organize-node.herokuapp.com/api/personal`,
      JSON.stringify(data),
      {
        headers,
      }
    );
  }

  deleteLog(id) {
    let headers = new HttpHeaders({
      'token': this.getToken(),
    });

    return this.http.delete<any>(
      `https://self-organize-node.herokuapp.com/api/personal/${id}`,
      {
        headers,
      }
    );
  }

}
