import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  tripId: any;
  organizerId: any;

  constructor(private http: HttpClient, private activatedRoute : ActivatedRoute, private router: Router) {}

  trip = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['tripId'];

      console.log(`${id}`);

      this.http.get('/api/trips/'+id)
      .subscribe((res: any) => {
        this.trip.push(res);
        console.log(this.trip);

      });
      });
  }

  goEdit(){
    this.activatedRoute.params.subscribe(params => {
      let id = params['tripId'];
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
      this.tripId = params['tripId'];
      this.organizerId = params['id']
    this.http.delete('/api/trips/'+this.tripId)
    .subscribe((res: any)=>{
      console.log('navigate to profile after cancel');


    })

  });
  this.router.navigate([`/organizer/${this.organizerId}/profile`])

  }

}
