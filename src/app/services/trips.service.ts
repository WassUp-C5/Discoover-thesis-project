import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private http: HttpClient) { }

  getReservationByTripIdAndUserId(tripId:string, userId:string){
    return this.http.get(`/api/trips/${tripId}/users/${userId}/reservations`);
  }
}
