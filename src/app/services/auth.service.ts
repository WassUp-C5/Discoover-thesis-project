import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from './../models/User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = "/api/auth";
  constructor(private http: HttpClient) {}

  signup(user:User):Observable<User> {
    return this.http.post<User>(this.authUrl + '/signup', user, httpOptions);
  }
}
