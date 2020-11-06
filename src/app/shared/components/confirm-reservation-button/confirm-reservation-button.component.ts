import { Component, Input, OnInit } from '@angular/core';
import { TripReservation } from 'src/app/models/TripReservation';
import { TripsService } from 'src/app/services/trips.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-confirm-reservation-button',
  templateUrl: './confirm-reservation-button.component.html',
  styleUrls: ['./confirm-reservation-button.component.css'],
})
export class ConfirmReservationButtonComponent implements OnInit {
  @Input() reservationStatus;

  confirmed:Boolean;

  constructor(
    private tripsService: TripsService,
    private _flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.confirmed = this.reservationStatus.confirmed;
  }

  // trip id
  // traveler id
  // reservation id

  onClick() {
    this.tripsService
      .confirmTripReservation(this.reservationStatus)
      .subscribe((result: TripReservation) => {
        this.confirmed = result.confirmed;
        this._flashMessagesService.show('Traveler added successfully to travelers list.', { cssClass: 'alert-success', timeout: 3000 });
      });
  }
}
