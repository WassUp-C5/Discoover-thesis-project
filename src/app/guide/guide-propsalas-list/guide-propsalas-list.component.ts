import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Guide from 'src/app/models/Guide';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-guide-propsalas-list',
  templateUrl: './guide-propsalas-list.component.html',
  styleUrls: ['./guide-propsalas-list.component.css']
})
export class GuidePropsalasListComponent implements OnInit {

  currentUser = this.tokenStorage.getUser();
  trips = [];
  proposals = [];
  guide: Guide;
  guideId: string;
  currentProposal = [];
  dataIsReady: boolean = false;


  constructor(
    private tokenStorage: TokenStorageService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((param) => {
      if (param['id']) {
        this.guideId = param['id'];
      } else {
        this.guideId = param['guideId'];
      }

      this.http
        .get(`/api/users/guides/${this.guideId}`)
        .subscribe((res: any) => {
          console.log('on init guide infos', res);
          this.guide = res;
          this.dataIsReady = true;
          // this.guide.gender = 'Male';
          console.log(this.guide);
          // this.guide.qualifications = res.qualifications;
          console.log('user qualification ==>', this.guide.qualifications);
        });
      /*************Get all the proposal by guide ID******************* */
      this.http
        .get(`/api/proposals/guides/${this.guideId}`)
        .subscribe((res: any) => {
          this.proposals = res;
          console.log('on init guide proposals', this.proposals);
          console.log('on init guide current prop', this.currentProposal);
          this.proposals.forEach((proposal) => {
            let tripId = proposal.tripId;
            let currentProposalStatus =
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

  accept(tripId, proposalId) {
    this.http
      .put(`/api/trips/edit/${tripId}`, {
        guide: this.currentUser.id,
      })
      .subscribe((response) => {
        console.log(response);
      });
    this.http
      .put(`/api/proposals/guides/acceptance/${proposalId}`, {
        accepted: true,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  decline(tripId, proposalId, guideId) {
    this.http
      .put(`/api/proposals/guides/acceptance/${proposalId}`, {
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
