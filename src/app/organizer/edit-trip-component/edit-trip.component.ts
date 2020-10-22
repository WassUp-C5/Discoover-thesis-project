import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  trip: FormGroup;
  toEdit = [];
  newData = {
    title: '',
    location: '',
    price: '',
    date: '',
    description: '',
    maxTravelers: ''
  }
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
    this.http.get('api/trips/'+id)
    .subscribe((res: any) => {
      this.toEdit.push(res);
      console.log(this.toEdit);

    });
    })
  }
 ////////////////////////////////////////////////////// last thing here to edit in DB
  onSubmit(){

    // this.trip = this.formBuilder.group({})

    console.log('this trip update', this.toEdit[0]);
    this.route.params.subscribe(params => {
      let id = params['id'];
    // this.http.put(id,'api/trips/')
    // .subscribe((res: any) => {
    //   this.toEdit.push(res);
    //   console.log(this.toEdit);

    // });
    })
  }

}
