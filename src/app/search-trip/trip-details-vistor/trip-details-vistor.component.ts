import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import User from './../../models/User';
import { TokenStorageService } from 'src/app/services/token-storage.service.js';
import { UsersService } from 'src/app/services/users.service';
import { TripsService } from 'src/app/services/trips.service';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-trip-details-vistor',
  templateUrl: './trip-details-vistor.component.html',
  styleUrls: ['./trip-details-vistor.component.css'],
})
export class TripDetailsVistorComponent implements OnInit {
  tripId: string;
  organizer: User;
  tripDetails: any;
  organizerName: String;
  guideInfo: User;
  isLoggedIn = !!this.tokenStorage.getUser();
  currentUser = this.tokenStorage.getUser();
  currentConnectedUserData;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private usersService: UsersService,
    private tripsService: TripsService,
    private urlService: UrlService
  ) {}

  ngOnInit(): void {
    if(this.isLoggedIn){
    this.usersService
      .getCurrentConnectedUser(this.currentUser.id, this.currentUser.roles[1])
      .subscribe((user) => {
        this.currentConnectedUserData = user;
      });
    }
    else {
      this.currentUser = {
        id: null,
        roles: []
      }
    }
    this.route.params.subscribe((param) => {
      this.tripId = param['id'];
      console.log('tripd IDDDD', this.tripId);

      this.http.get(`/api/trips/${this.tripId}`).subscribe((data: any) => {
        this.tripDetails = data;
        console.log('the data from DB is ====>', this.tripDetails);

        let id = this.tripDetails.organizerId._id;
        this.http
          .get(`/api/users/organizer/${id}`)
          .subscribe((result: User) => {
            this.organizer = result;
            console.log('the result from DB is ===>', result);
          });
        let guideId = this.tripDetails.guide[0];
        console.log('id guide', guideId);
            if(guideId) {
              this.http
              .get(`/api/users/guide/${guideId}`)
              .subscribe((result: User) => {
                this.guideInfo = result;
                console.log('the guide name is ====>', this.guideInfo.first_name);
              });
            }
      });
    });
  }

  showOrganizer() {
    if (this.isLoggedIn) {
      this.router.navigate(['/organizer', this.organizer?.id, 'profile']);
    } else {
      this.router.navigate(['/signin']);
    }
  }

  /***********Boook a trip ********************* */
  book(tripID) {
    console.log('tripID', tripID);
    if (this.isLoggedIn) {
      let triperID = this.currentUser.id;
      console.log('triperID', triperID);

      this.http
        .put(`/api/trips/add/triper/${tripID}`, { triperID })
        .subscribe((result) => {
          console.log('a new triper has been added===>', result);
          this.tripDetails = result;
        });
    } else {
      this.urlService.setPreviousUrl(this.router.url)
      this.router.navigate(['/signin']);
    }
  }
  /*****************Cancel Booking********************** */
  cancelBooking(tripID) {
    this.http
      .put(
        `/api/trips/${tripID}/travelers/${this.currentUser.id}/reservations/cancel`,
        { travelerId: this.currentUser.id }
      )
      .subscribe((result) => {
        console.log('The triper has been deleted===>', result);
        this.tripDetails = result;
      });
  }
}
