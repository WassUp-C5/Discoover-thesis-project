import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css'],
})
export class TripDetailsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  trip = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
<<<<<<< HEAD

      console.log(`${id}`);

      this.http.get('/api/trips/' + id).subscribe((res: any) => {
        this.trip.push(res);
        console.log(this.trip);
=======
      this.http.get('/api/trips/'+id)
      .subscribe((res: any) => {
        this.trip.push(res);
      });
>>>>>>> 5fc56c341ddfce035bc2e041f24ccabe4158d437
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
      let id = params['id'];
      this.router.navigate(['/organizer/trip/details/guides/' + id]);
    });
  }

  cancel(){
    let id;
    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
    this.http.delete('/api/trips/delete/'+id)
    .subscribe((res: any)=>{
      console.log('navigate to profile after cancel');
    })
    this.http
      .delete(`/api/proposals/delete/${id}`)
      .subscribe((res) => console.log(res));
  });
  this.router.navigate([`/organizer/${id}/profile/`])
  }
}
