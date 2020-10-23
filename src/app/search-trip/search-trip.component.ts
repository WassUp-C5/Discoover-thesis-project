import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../../server/models/Trips.js';
import { element } from 'protractor';
@Component({
  selector: 'app-search-trip',
  templateUrl: './search-trip.component.html',
  styleUrls: ['./search-trip.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchTripComponent implements OnInit {
  trips: Trip[];
  pickedDate: any;
  searchLocation = '';
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
      console.log('the data is ==>', this.trips);
    });
  }
  searchLocationHandler(event: any) {
    this.searchLocation = event.target.value;
    if(this.searchLocation === "" && this.pickedDate === undefined) {
    this.reload()
    console.log('this is the location ==>', this.searchLocation);
    }
  }
  searchDateHandler(event: any) {
    this.pickedDate = event.target.value;
    console.log('this is the date ==>', this.pickedDate);
  }

  getLocationTrips() {
    console.log('pickDate is ==>', new Date(this.pickedDate));
    console.log('LOCATION ==>', this.searchLocation);
    console.log(this.trips);

    if (this.searchLocation !== '' && this.pickedDate === undefined) {
      this.trips = this.trips.filter(
        (trip) => trip.location === this.searchLocation
      );
    } else if (this.searchLocation === '' && this.pickedDate !== undefined) {
      this.trips = this.trips.filter(
        (trip) =>
          new Date(trip.date).toLocaleDateString() ===
          new Date(this.pickedDate).toLocaleDateString()
      );
    } else if (this.searchLocation !== '' && this.pickedDate !== undefined) {
      this.trips = this.trips.filter(
        (trip) =>
          trip.location === this.searchLocation && trip.date === this.pickedDate
      );
    }
    else if(this.searchLocation === "" && this.pickedDate === undefined){
     this.reload();
    }
 }

 reload() {
    this.http.get('/api/trips').subscribe((data: Trip[]) => {
      this.trips = data;
    });
 }
}
