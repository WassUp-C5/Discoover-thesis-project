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
  currentUser: any = this.tokenStorage.getUser();
  trip = [];
  publishStatus = null;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['tripId'];
      this.http.get('/api/trips/' + id).subscribe((res: any) => {
        this.trip.push(res);
        this.publishStatus = res.published;
        console.log('====================================');
        console.log('trip should be === ', this.publishStatus);
        console.log('====================================');
      });
    });
  }

  goEdit() {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['tripId'];
      this.router.navigate(['/organizer/trip/edit/' + id]);
    });
  }
  goToGuides() {
    this.activatedRoute.params.subscribe((params) => {
      let tripId = params['tripId'];
      this.router.navigate(['/organizer/trip/details/guides/' + tripId]);
    });
  }

  getGuideInfo(guideId, tripId) {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];

      this.router.navigate([`/guide/${guideId}/profile/${tripId}`]);
    });
  }

  publish(tripId) {
    this.http
      .put(`/api/trips/publish/${tripId}`, {
        published: true,
      })
      .subscribe((response) => {
        console.log(response);
        this.publishStatus = true;
      });
  }

  unpublish(tripId) {
    this.http
      .put(`/api/trips/publish/${tripId}`, {
        published: false,
      })
      .subscribe((response) => {
        console.log(response);
        this.publishStatus = false;
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
