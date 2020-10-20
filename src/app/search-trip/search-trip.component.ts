import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../../server/models/Trips.js';
@Component({
  selector: 'app-search-trip',
  templateUrl: './search-trip.component.html',
  styleUrls: ['./search-trip.component.css'],
})
export class SearchTripComponent implements OnInit {
  trips: Trip[];
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // don't delete this please
    // this.http
    //   .get('/api/trips/5f8af2f5d7ebfa75d4997522')
    //   .subscribe((data: Trip[]) => {
    //     this.trip = data;
    //   });+
    this.http.get('/api/trips').subscribe((data: Trip[]) => {
      this.trips = data;
    });
  }
}
