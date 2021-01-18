import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  private heads = new HttpHeaders();

  constructor( private http: HttpClient ) { }

  // getToken() {
  //   return localStorage.getItem('token');
  // }
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZiMjhkOGU3NTI3ZDUxZTk4NDQ2OWM3In0sImlhdCI6MTYxMDg3MTAwNiwiZXhwIjoxNjEwOTcxMDA2fQ.dz4JUs_BqpEMWQuzHtFU4lr7WG5KMTOtGtstF8QHRWo'

  postLog(data) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token,
    });

    return this.http.post<any>(
      `http://localhost:5000/api/personal`,
      JSON.stringify(data),
      {
        headers,
      }
    );
  }

  deleteLog(id) {
    let headers = new HttpHeaders({
      'token': this.token,
    });

    return this.http.delete<any>(
      `http://localhost:5000/api/personal/${id}`,
      {
        headers,
      }
    );
  }


}
