import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

// import { User } from './../models/User';

@Component({
  selector: 'app-guide-profile',
  templateUrl: './guide-profile.component.html',
  styleUrls: ['./guide-profile.component.css'],
})
export class GuideProfileComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  guide = {
    username: '',
    first_name: '',
    last_name: '',
    gender: '',
    location: '',
    email: '',
    password: '',
    bio: '',
    phone_number: '',
    qualifications: [],
  };
  proposals = [];
  trips = [];
  currentUser = this.tokenStorage.getUser();
  userRole = this.currentUser.roles[1];
  condition = this.currentUser.roles[1] !== 'guide';
  guideId: string;
  currentProposal = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.guideId = params['id'];
      let guideIdforOrg = params['guideId'];
      let tripIdFromLink = params['tripId'];

      /* ****************Get current proposal with guideId and tripId********************** */
      this.http.get(`/api/proposals/current/${guideIdforOrg}/${tripIdFromLink}`)
      .subscribe((res: any) =>{
        this.currentProposal = res
      })
    });
    this.activatedRoute.params.subscribe((params) => {
      let id = params['guideId'];

      let userId = this.userRole === 'guide' ? this.currentUser.id : id;
      console.log('the user IDDD ==>', userId);

      this.http.get(`/api/user/guide/${userId}`).subscribe((res: any) => {
        console.log('on init guide infos', res);
        this.guide = res;
        // this.guide.gender = 'Male';
        console.log(this.guide);
        // this.guide.qualifications = res.qualifications;
        console.log('user qualification ==>', this.guide.qualifications);
      });
      /*************Get all the proposal by guide ID******************* */
      this.http.get(`/api/proposals/guide/${userId}`).subscribe((res: any) => {
        this.proposals = res;
        console.log('on init guide proposals', this.proposals);
        console.log('on init guide current prop', this.currentProposal);
        this.proposals.forEach((proposal) => {
          let tripId = proposal.tripId;
          // let proposalId = proposal._id;
          this.http.get(`/api/trips/${tripId}`).subscribe((res) => {
            console.log('tripiya wa7da ', res);
            this.trips.push({ res, proposal });
          });
        });
        console.log('this.trips ======>', this.trips);
      });

    });
  }

  getGuide() {
    this.http.get(`/api/user/guide/${this.guideId}`).subscribe((guide: any) => {
      this.guide = guide;
      console.log('New guide ==>', this.guide);
    });
  }

  // genderHandler(event: any) {
  //   this.guide.gender = event.target.value;
  //   console.log(this.guide.gender);
  // }

  // changeLanguageHandler(event: any) {
  //   this.language = event.target.value;
  //   console.log('the language ===>', this.language);
  // }

  // changeLevelHandler(event: any) {
  //   this.selectedLevel = event.target.value;
  //   console.log('the lenguage level ===>', this.selectedLevel);
  // }

  hire() {
    this.activatedRoute.params.subscribe((params) => {
      let tripId = params['tripId'];
      let guideId = params['guideId'];
      let proposal = {
        organizerId: this.currentUser.id,
        guideId: guideId,
        tripId: tripId,
        accepted: null,
      };
      // console.log('trip id ====>', tripId);
      // console.log('guide id ====>', `/api/trips/${tripId}/edit`);

      ////////// submitting a proposal
      this.http
        .post('/api/proposals/add', proposal)

        .subscribe((result) => {
          console.log(
            'return of adding new proposal (hiring)===>',
            result
          );
        });
    });

    this.router.navigate([`/organizer/${this.currentUser.id}/profile`]);
  }

  unhire() {
    console.log('current prop when press unhire ===>', this.currentProposal);
      this.http

      .delete(`/api/proposals/delete/one/${this.currentProposal[0]._id}`)
      .subscribe((res) => {
        console.log(res)
        console.log('this.currentProposal before update ====>', this.currentProposal);
        this.currentProposal = [];
        console.log('this.currentProposal after update ====>', this.currentProposal);

    }
      );
      let guideId = this.currentProposal[0].guideId
      let tripIdToRm = this.currentProposal[0].tripId
      this.http
      .put(`/api/trips/rmGuide/${tripIdToRm}`, { guideId})
      .subscribe((response) => {
        console.log(response);
      });
  }
  /************We are here for the button of the accept and decline************************ */
  accept(tripId, proposalId) {
    this.http
      .put(`/api/trips/edit/${tripId}`, {
        guide: this.currentUser.id,
      })
      .subscribe((response) => {
        console.log(response);
      });
    this.http
      .put(`/api/proposals/guide/acceptance/${proposalId}`, {
        accepted: true,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  decline(tripId, proposalId, guideId) {
    this.http
      .put(`/api/proposals/guide/acceptance/${proposalId}`, {
        accepted: false,
      })
      .subscribe((response) => {
        console.log(response);
      });
    this.http
      .put(`/api/trips/rmGuide/${tripId}`, { guideId })
      .subscribe((response) => {
        console.log(response);
      });
  }


}
