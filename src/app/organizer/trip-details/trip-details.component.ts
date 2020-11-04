import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Trip from 'src/app/models/Trip';
import { TripsService } from 'src/app/services/trips.service';
import Traveler from 'src/app/models/Traveler';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css'],
})
export class TripDetailsComponent implements OnInit {
  constructor(
    private tokenStorage: TokenStorageService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tripsService: TripsService
  ) {}
  currentUser: any = this.tokenStorage.getUser();

  trip: Trip;
  guides = [];
  publishStatus = null;

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params) => {
    //   let id = params['tripId'];
    //   this.http.get('/api/trips/' + id).subscribe((res: any) => {
    //     this.trip = res;
    //     this.publishStatus = res.published;
    //     console.log('====================================');
    //     console.log('trip should be === ', this.publishStatus);
    //     console.log('====================================');
    //   });
    // });

    this.getTrip();
  }

  getTrip() {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['tripId'];
      this.tripsService.getTripById(id).subscribe((trip: Trip) => {
        this.trip = trip;
        console.log('====================================');
        console.log('trip details ===>> ', this.trip);
        console.log('====================================');
      });
    });
  }

  goToTravelerProfile(reservation) {
    let role = reservation.traveler.roles[1];
    let traveler_id = reservation.traveler._id;
    let trip_id = this.trip._id;
    console.log(this.trip._id);

    this.router.navigate([`/${role}/${traveler_id}/profile`], {
      queryParams: {
        reservation_id: reservation._id,
        confirmed: reservation.confirmed,
        trip_id: trip_id,
        traveler_id: traveler_id,
      },
    });
  }

  goEdit() {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['tripId'];
      this.router.navigate(['/organizer/trip/edit/' + id]);
    });
  }
  // goToGuides(location) {
  //   console.log('location', location);
  //   // this.activatedRoute.params.subscribe((params) => {
  //   // });
  //   this.router.navigate(['/organizer/trip/details/guides/' + location]);
  // }
  goToGuides(location) {
    this.activatedRoute.params.subscribe((params) => {
      let tripId = params['tripId'];
      this.router.navigate([
        '/organizer/trip/details/guides/' + tripId + '/' + location,
      ]);
    });
  }

  getGuideInfo(guideId, tripId) {
    this.router.navigate([`/guide/${guideId}/profile/${tripId}`]);
  }

  publish(tripId) {
    this.http
      .put(`/api/trips/publish/${tripId}`, {
        published: true,
      })
      .subscribe((response: Trip) => {
        console.log(response);
        this.trip.published = response.published;
      });
  }

  unpublish(tripId) {
    this.http
      .put(`/api/trips/publish/${tripId}`, {
        published: false,
      })
      .subscribe((response: Trip) => {
        console.log(response);
        this.trip.published = response.published;
      });
  }

  cancel() {
    let id;
    this.activatedRoute.params.subscribe((params) => {
      id = params['tripId'];
      this.http
        .delete('/api/trips/delete/' + id + '/' + this.currentUser.id)
        .subscribe((res: any) => {
          console.log('navigate to profile after cancel');
        });
      this.http
        .delete(`/api/proposals/delete/${id}`)
        .subscribe((res) => console.log(res));
    });
    this.router.navigate([`/organizer/${this.currentUser.id}/profile/`]);
  }
}
