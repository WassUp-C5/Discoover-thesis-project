import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../../../../server/models/Trips.js';


@Component({
  selector: 'app-trip-details-vistor',
  templateUrl: './trip-details-vistor.component.html',
  styleUrls: ['./trip-details-vistor.component.css']
})

export class TripDetailsVistorComponent implements OnInit {

  tripId: string;
  organizer: [];
  tripDetails: Trip;


  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.tripId = param["id"];
      this.http
        .get(`/api/trips/${this.tripId}`)
        .subscribe((data: Trip[]) => {
          this.tripDetails = data;
          console.log('the data is ==========>', this.tripDetails.organizerId)
          let id = this.tripDetails.organizerId

          this.http
          .get(`/api/user/organizer/${id}`)
          .subscribe((result ) => {
           console.log('the result of org is ===========>', result);

          })
          // console.log('the organizer name =======>', this.organizerName);
        });
    });

  }

}
