import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

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
    private router: Router
  ) {}
    currentUser:any = this.tokenStorage.getUser();
  trip = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      this.http.get('/api/trips/' + id).subscribe((res: any) => {
        this.trip.push(res);
      });
    });
  }

  goEdit() {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      this.router.navigate(['/organizer/trip/edit/' + id]);
    });
  }
  goToGuides() {
    this.activatedRoute.params.subscribe((params) => {
      let tripId = params['id'];
      this.router.navigate(['/organizer/trip/details/guides/' + tripId]);
    });
  }

  getGuideInfo(guideId){
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];

    this.router.navigate([`/guide/${guideId}/profile/${id}`])
  })
}

  publish(tripId) {
    this.http
      .put(`/api/trips/publish/${tripId}`, {
        published: true,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  unpublish(tripId) {
    this.http
      .put(`/api/trips/publish/${tripId}`, {
        published: false,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  cancel() {
    let id;
    this.activatedRoute.params.subscribe((params) => {
      id = params['id'];
      this.http.delete('/api/trips/delete/' + id + '/' + this.currentUser.id).subscribe((res: any) => {
        console.log('navigate to profile after cancel');
      });
      this.http
        .delete(`/api/proposals/delete/${id}`)
        .subscribe((res) => console.log(res));
    });
    this.router.navigate([`/organizer/${this.currentUser.id}/profile/`]);
  }
}
