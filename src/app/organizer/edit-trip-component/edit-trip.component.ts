import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css'],
})
export class EditTripComponent implements OnInit {
  trip: FormGroup;
  toEdit: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.http.get('api/trips/' + id).subscribe((res: any) => {
        console.log('reees', res);
        this.toEdit=res;
        this.toEdit["date"] = this.toEdit["date"].toISOString().split('T')[0];
        console.log('===>>>==',this.toEdit);
      });
    });
  }
  ////////////////////////////////////////////////////// last thing here to edit in DB
  onSubmit() {
    // this.trip = this.formBuilder.group({})

    console.log('this trip update', this.toEdit);

    this.route.params.subscribe((params) => {
      let id = params['id'];
      console.log('====================================');
      console.log('org Id after submitting edit === ', id);
      console.log('====================================');
      this.http
        .put('api/trips/' + id + '/edit', this.toEdit)
        .subscribe((res: any) => {

          // this.toEdit.push(res);
          // console.log(this.toEdit);
          this.router.navigate([`/organizer/${id}/profile`]);
        });
    });
  }
}
