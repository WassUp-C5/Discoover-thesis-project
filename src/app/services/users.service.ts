import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  Traveler from './../models/Traveler';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getTraveler(id:string): Observable<Traveler>{
    return this.http.get<Traveler>(`/api/users/travelers/${id}`);
  }


}
