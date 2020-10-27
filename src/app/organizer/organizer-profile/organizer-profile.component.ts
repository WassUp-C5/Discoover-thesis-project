import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
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
  organizer = {
    first_name: '',
    username: '',
    last_name: '',
    gender: '',
    location: '',
    email: '',
    password: '',
    bio: '',
    phone_number: '',
  };
  proposals = [];
  tripP = []

  constructor(private http: HttpClient, private token: TokenStorageService, private router: Router) {}
  trips: Trip[];

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    // Get organizer infos from DB // Works Fine
    this.http
      .get(`/api/user/organizer/${this.currentUser.id}`)
      .subscribe((res: any) => {
        console.log(' 1 . Oninit Organizer Schema ===> ', res);
        this.organizer = res;
      });
    // Get all the organizer's trips // Works Fine
    this.http
      .get(`/api/user/organizer/trips/${this.currentUser.id}`)
      .subscribe((data: Trip[]) => {
        console.log("organizer trips to be shown in my trips ====> ", data)
        this.trips = data;
      });
     // Get all the proposals by organizer ID // Works Fine
     this.http.get(`/api/proposals/organizer/${this.currentUser.id}`).subscribe((res: any) => {
      this.proposals = res;
      console.log('on init organizer proposals', this.proposals);
      this.proposals.forEach((proposal) => {
        let tripId = proposal.tripId;
        this.http.get(`/api/trips/${tripId}`).subscribe((res) => {
          console.log('tripiya wa7da ', res);
          this.tripP.push({ res, proposal });
        });
      });
      console.log('this.trips ======>', this.tripP);
    });
  }

  // Redirect to create trip
  addTrip(){
    this.currentUser = this.token.getUser();
    this.router.navigate([`/organizer/${this.currentUser.id}/trip/add`])
  }

  // Redirect to trip details
  getTrip(tripId){
    this.router.navigate(['/organizer/trip/details/'+tripId])
  }

  // Cancel a proposition and rm this guide id from trip schema
  cancelProp(propId, guideId, tripId){
    this.http
    .delete(`/api/proposals/delete/one/${propId}`)
    .subscribe((res) => console.log(res));
    this.http
    .put(`/api/trips/rmGuide/${tripId}`, {guideId} )
    .subscribe((res) => console.log('after the pull request to rm guide Id from array ===>', res));
  }

  genderHandler(event: any) {
    this.organizer.gender = event.target.value;
    console.log(this.organizer.gender);
  }

  // Edit organizer profile
  onClick() {
    this.http
    .put('/api/user/organizer/edit', this.organizer)
    .subscribe((res) => {
      console.log(res);
    });
    window.location.reload();
  }
}
