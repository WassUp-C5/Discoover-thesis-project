import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
})
export class TripListComponent implements OnInit {
  trips = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('/api/trips').subscribe((res: any) => {
      this.trips = res;
      console.log('your trips are ==>', this.trips);
    });
  }
}
