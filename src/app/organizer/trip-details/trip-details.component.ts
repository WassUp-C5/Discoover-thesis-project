import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  constructor(private http: HttpClient, private activatedRoute : ActivatedRoute, private router: Router) {}

  trip = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.http.get('/api/trips/'+id)
      .subscribe((res: any) => {
        this.trip.push(res);
      });
      });
  }

  goEdit(){
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.router.navigate(['/organizer/trip/edit/'+id])
    })
  }
  goToGuides() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.router.navigate(['/organizer/trip/details/guides/'+id])
    })
  }

  cancel(){
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
    this.http.delete('/api/trips/delete/'+id)
    .subscribe((res: any)=>{
      console.log('navigate to profile after cancel');
    })
  });
  this.router.navigate(['/organizer/profile/'])
  }

}
