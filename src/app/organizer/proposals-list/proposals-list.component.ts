import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-proposals-list',
  templateUrl: './proposals-list.component.html',
  styleUrls: ['./proposals-list.component.css']
})
export class ProposalsListComponent implements OnInit {

  proposals: [];
  session = this.tokenStorage;
  p: number = 1;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getProposals();

  }

  getProposals(){
    // Get all the proposals by organizer ID
    this.http
      .get(`/api/proposals/organizer/${this.session.getUser().id}`)
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
  }

  // Cancel a proposition
  cancelProp(id) {
    this.http
      .delete(`/api/proposals/delete/one/${id}`)
      .subscribe((res) => console.log(res));
  }

  getGuideInfo(guideId, tripId) {
    this.router.navigate([`/guide/${guideId}/profile/${tripId}`]);
  }

}
