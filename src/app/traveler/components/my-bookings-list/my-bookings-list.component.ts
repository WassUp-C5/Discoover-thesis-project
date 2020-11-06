import { Component, OnInit } from '@angular/core';
import { TripReservation } from 'src/app/models/TripReservation';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-my-bookings-list',
  templateUrl: './my-bookings-list.component.html',
  styleUrls: ['./my-bookings-list.component.css']
})
export class MyBookingsListComponent implements OnInit {

  tripReservations: TripReservation[];

  constructor(
    private tripsService: TripsService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    let id = this.tokenStorage.getUser().id;
    this.getUserReservations(id);
  }

  getUserReservations(id){
    this.tripsService.getUserTripReservations(id).subscribe((result:TripReservation[]) => {
      this.tripReservations = result;
      console.log(this.tripReservations)
    })
  }

}
