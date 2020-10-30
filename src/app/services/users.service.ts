import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  Traveler from './../models/Traveler';
import Guide from './../models/Guide';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  traveler: Observable<Traveler>;

  constructor(private http: HttpClient) { }

  getTraveler(id): Observable<Traveler>{
    return this.http.get<Traveler>(`/api/users/travelers/${id}`);
  }

  getGuide(id){
    return this.http.get<Guide>(`/api/user/guide/${id}`);
  }
}
