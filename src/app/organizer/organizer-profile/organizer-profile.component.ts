import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './../../services/token-storage.service';
import { Trip } from '../../../../server/models/Trips';
@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.css'],
})
export class OrganizerProfileComponent implements OnInit {
  currentUser: any;
  selectedGender = '';
  organizerId: string;
  organizer: any;
  proposals = [];
  reservationStatus: any;

  // tripP = [];

  constructor(
    private http: HttpClient,
    private token: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  trips: Trip[];

  ngOnInit(): void {

    this.showReservationConfirmButton();

    this.currentUser = this.token.getUser();
    // Get organizer infos from DB
    this.route.params.subscribe((param) => {
      this.organizerId = param['id'];
    });
    this.http
      .get(`/api/users/organizers/${this.organizerId}`)
      .subscribe((res: any) => {
        this.organizer = res;
      });
    // Get all the organizer's trips // Works Fine
    this.http
      .get(`/api/users/organizers/${this.currentUser.id}/trips`)
      .subscribe((data: Trip[]) => {
        console.log('organizer trips to be shown in my trips ====> ', data);
        this.trips = data;
      });
    // Get all the proposals by organizer ID
    this.http
      .get(`/api/proposals/organizer/${this.currentUser.id}`)
      .subscribe((res: any) => {
        this.proposals = res;
        console.log('on init organizer proposals', res);
        // this.proposals.forEach((proposal) => {
        //   let tripId = proposal.tripId;
        //   this.http.get(`/api/trips/${tripId}`).subscribe((result) => {
        //     // let guideID = result.guides[0];
        //     // this.http.get(`/api/users/guides/${}`)
        //     console.log('tripiya wa7da ', result);
        //     this.tripP.push({ res, proposal });
        //   });
        // });
        // console.log('this.trips ======>', this.tripP);
      });
    // Work is here nowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww show guide name in proposal
  }

  showReservationConfirmButton(){
    this.route.queryParamMap
  .subscribe((params) => {
    this.reservationStatus = { ...params.keys, ...params };
  }
);
  }

  // Redirect to create trip
  addTrip() {
    this.currentUser = this.token.getUser();
    console.log('current user ====>', this.currentUser.id);

    this.router.navigate([`/organizer/${this.currentUser.id}/trip/add`]);
  }

  // Redirect to trip details
  getTrip(tripId) {
    console.log('====================================');
    console.log('tripId from show more ===> ', tripId);
    console.log('====================================');
    this.router.navigate(['/organizer/trip/details/' + tripId]);
  }

  // Cancel a proposition
  cancelProp(id) {
    this.http
      .delete(`/api/proposals/delete/one/${id}`)
      .subscribe((res) => console.log(res));
  }

  genderHandler(event: any) {
    this.organizer.gender = event.target.value;
    console.log(this.organizer.gender);
  }

  getGuideInfo(guideId, tripId) {
    this.router.navigate([`/guide/${guideId}/profile/${tripId}`]);
  }

  // Edit organizer profile
  onClick() {
    this.http
      .put('/api/users/organizer/edit', this.organizer)
      .subscribe((res) => {
        console.log(res);
      });
    window.location.reload();
  }
}
