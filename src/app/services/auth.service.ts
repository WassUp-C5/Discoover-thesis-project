import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = '/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        email: credentials.email,
        password: credentials.password,
      },
      httpOptions
    );
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', user);
  }

}
