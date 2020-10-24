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
  pickedDate: any;
  searchLocation = '';
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    if (this.pickedDate === undefined && this.searchLocation === '') {
      this.http.get('/api/trips').subscribe((data: Trip[]) => {
        this.trips = data;
        console.log('the data is ==>', this.trips);
      });
    } else if (this.pickedDate === undefined && this.searchLocation !== '') {
      console.log('the search location', this.searchLocation);
      this.http
        .get(`/api/trips/location/${this.searchLocation}`)
        .subscribe((data: Trip[]) => {
          console.log('the location data ==>', data);
          this.trips = data
        });
    } else if (this.pickedDate !== undefined && this.searchLocation === '') {
      console.log('the search date', this.pickedDate);
      this.http
        .get(`/api/trips/date/${this.pickedDate}`)
        .subscribe((data: Trip[]) => {
          console.log('the date data ==>', data);
          this.trips = data
        });
    }
  }

  searchLocationHandler(event: any) {
    this.searchLocation = event.target.value;
    if (this.searchLocation === '' && this.pickedDate === undefined) {
      console.log('this is the location ==>', this.searchLocation);
    }
  }
  searchDateHandler(event: any) {
    this.pickedDate = event.target.value;
    console.log('this is the date ==>', this.pickedDate);
  }
}
