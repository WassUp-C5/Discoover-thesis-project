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
  isGuide: Boolean = false;
  isInwaitingList: Boolean = false;
  tripDetails: any;
  organizerName: String;
  guideInfo: User;
  isLoggedIn = !!this.tokenStorage.getUser();
  currentUser = this.tokenStorage.getUser();
  currentConnectedUserData;
  isConfirmed: boolean = false;
  isBooked: boolean;
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
        console.log('Connected user',this.currentConnectedUserData)
      });
    }
    else {
      this.currentUser = {
        id: null,
        roles: [],
      };
    }
    this.route.params.subscribe((param) => {
      this.tripId = param['id'];
      console.log('tripd IDDDD', this.tripId);

      this.http.get(`/api/trips/${this.tripId}`).subscribe((data: any) => {
        this.tripDetails = data;
        console.log('the data from DB is ====>', this.tripDetails);

        for(var i = 0; i < this.tripDetails.reservations.length; i++){
          if(this.currentUser.id === this.tripDetails.reservations[i].traveler._id){
            this.isBooked = true;
          }
        }

        this.checkButtons(this.tripDetails)

        let id = this.tripDetails.organizer._id;
        this.http
          .get(`/api/users/organizers/${id}`)
          .subscribe((result: User) => {
            this.organizer = result;
            console.log('the result from DB is ===>', result);
          });
        let guideId = this.tripDetails.guides[0]._id;
        console.log('id guide', guideId);

            if(guideId) {
              this.http
              .get(`/api/users/guides/${guideId}`)
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
  checkButtons(trip){

    for(let i = 0; i < trip.guides.length; i++){
      console.log(trip.guides[i]._id)
      console.log(this.currentUser.id === trip.guides[i]._id);
      if(this.currentUser.id === trip.guides[i]._id){
        this.isGuide = true;
        console.log('====================================');
        console.log('is guide: ', this.isGuide)
        console.log('====================================');

      }
    }

    for(let j = 0; j < trip.waitingList.length; j++){
      console.log(trip.waitingList[j]._id)
      console.log(this.currentUser.id === trip.waitingList[j]._id);
      if(this.currentUser.id === trip.waitingList[j]._id){
        this.isInwaitingList = true;
        console.log('====================================');
        console.log('isInwaitingList: ', this.isInwaitingList)
        console.log('====================================');
      }
    }
    for(let k = 0; k < trip.travelers.length; k++){
      if(this.currentUser.id === trip.travelers[k]._id){
        this.isConfirmed = true;
        console.log('====================================');
        console.log('isConfirmed: ', this.isConfirmed)
        console.log('====================================');
      }
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
          //this.checkButtons(this.tripDetails);
          this.isBooked = true;

        });
    } else {
      this.urlService.setPreviousUrl(this.router.url);
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
        // this.checkButtons(this.tripDetails);
        this.isBooked = false;
      });
  }
}
