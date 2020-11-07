import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Trip from 'src/app/models/Trip';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.css'],
})
export class TripsListComponent implements OnInit {
  trips: Trip[];
  p: number = 1;
  currentUser: any;

  constructor(private token: TokenStorageService, private router: Router,
    private tripsService: TripsService) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getAllMyTrips(this.currentUser.id);
  }

  // Redirect to create trip
  addTrip() {
    this.currentUser = this.token.getUser();
    console.log('current user ====>', this.currentUser.id);

    this.router.navigate([`/organizers/${this.currentUser.id}/trip/add`]);
  }

  // Get all the organizer's trips // Works Fine
  getAllMyTrips(id) {
    this.tripsService.getAlltripsByOrganizerId(id).subscribe((data: Trip[]) => {
      console.log('organizer trips to be shown in my trips ====> ', data);
      this.trips = data;
    });
  }

  // Redirect to trip details
  showTripDetail(tripId) {
    console.log('====================================');
    console.log('tripId from show more ===> ', tripId);
    console.log('====================================');
    this.router.navigate(['/organizers/trip/details/' + tripId]);
  }
}
