import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-booked-trip',
  templateUrl: './booked-trip.component.html',
  styleUrls: ['./booked-trip.component.css']
})
export class BookedTripComponent implements OnInit {

  @Input() tripReservation;

  constructor() { }

  ngOnInit(): void {
    console.log(this.tripReservation)
  }

}
