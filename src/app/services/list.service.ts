import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private heads = new HttpHeaders();

  constructor( private http: HttpClient ) { }

  // getToken() {
  //   return localStorage.getItem('token');
  // }
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZiMjhkOGU3NTI3ZDUxZTk4NDQ2OWM3In0sImlhdCI6MTYxMDg3MTAwNiwiZXhwIjoxNjEwOTcxMDA2fQ.dz4JUs_BqpEMWQuzHtFU4lr7WG5KMTOtGtstF8QHRWo'

  getLogs() {
    let headers = this.heads.set('token', this.token);
    return this.http.get<any>(`http://localhost:5000/api/personal`, { headers });
  }


}
