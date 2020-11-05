import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import Trip from 'src/app/models/Trip';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css'],
})
export class EditTripComponent implements OnInit {
  trip: FormGroup;
  toEdit = [];
  newTrip: Trip;
  date = '';
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.http.get('api/trips/' + id).subscribe((res: Trip) => {
        console.log('result', res);

        // this.toEdit.push(res);
        this.newTrip = res;
        this.newTrip.date = res.date.split('T')[0];
        console.log('this date', this.newTrip.date);
        console.log('new trip OBJ', this.newTrip);

        // console.log('helllllllooooooooooo', this.toEdit);
        // this.date = this.toEdit[0].date.split('T')[0];
        // console.log('date =============>', this.date);
      });
    });
  }

  ////////////////////////////////////////////////////// last thing here to edit in DB
  onSubmit() {
    // this.trip = this.formBuilder.group({})

    console.log('this trip update', this.newTrip);
    this.route.params.subscribe((params) => {
      let id = params['id'];
      console.log('====================================');
      console.log('org Id after submitting edit === ', id);
      console.log('====================================');

      this.http
        .put('api/trips/' + id + '/edit', this.newTrip)
        .subscribe((res: any) => {

          // this.toEdit.push(res);
          // console.log(this.toEdit);
          this.router.navigate([`/organizer/${id}/profile`]);
        });
    });
  }
}
