import { Component, Input, OnInit } from '@angular/core';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-confirm-reservation-button',
  templateUrl: './confirm-reservation-button.component.html',
  styleUrls: ['./confirm-reservation-button.component.css']
})
export class ConfirmReservationButtonComponent implements OnInit {

  @Input() reservationStatus;

  constructor(private tripsService: TripsService) { }

  ngOnInit(): void {
  }

  // trip id
  // traveler id
  // reservation id

  onClick(status){
    this.tripsService.confirmTripReservation(this.reservationStatus, status).subscribe(result => {

    })
  }

}
