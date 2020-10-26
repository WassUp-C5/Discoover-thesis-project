import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../../../../server/models/Trips.js';
import { User} from '../../../../server/models/User.js';


@Component({
  selector: 'app-trip-details-vistor',
  templateUrl: './trip-details-vistor.component.html',
  styleUrls: ['./trip-details-vistor.component.css']
})

export class TripDetailsVistorComponent implements OnInit {

  tripId: string;
  organizer: User;
  tripDetails: Trip;
  organizerName: String;


  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.tripId = param["id"];
      this.http
        .get(`/api/trips/${this.tripId}`)
        .subscribe((data: Trip[]) => {
          this.tripDetails = data;
          let id = this.tripDetails.organizerId

          this.http
          .get(`/api/user/organizer/${id}`)
          .subscribe((result: User[]) => {
            this.organizer = result;
          })
        });
    });

  }

}
