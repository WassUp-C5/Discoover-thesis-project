import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-organize-a-trip',
  templateUrl: './organize-a-trip.component.html',
  styleUrls: ['./organize-a-trip.component.css'],
})
export class OrganizeATripComponent implements OnInit {
  trip: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.trip = this.formBuilder.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      date: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      price: ['', Validators.required],
      description: ['', Validators.required],
      maxTravelers: ['', Validators.required],
    });
  }
  get f() {
    return this.trip.controls;
  }
  onSubmit() {
    this.submitted = true;

    if (this.trip.invalid) {
      return;
    }

    console.log(this.trip.value);
    // this.user.roles.push(this.route.snapshot.paramMap.get('role'));
    this.http
      .post<any>('/api/trips/add', {
        trip: this.trip.value,
        userId: '5f8af2f5d7ebfa75d4997522',
      })
      .subscribe((result) => {
        this.router.navigate(['/myTrips']);
      });
  }
}
