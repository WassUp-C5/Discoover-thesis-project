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

  capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  onSubmit() {
    this.submitted = true;

    if (this.trip.invalid) {
      return;
    }
    let newTitle = this.capitalize(this.trip.value.title);
    this.trip.value.title = newTitle;

    // this.user.roles.push(this.route.snapshot.paramMap.get('role'));
    this.route.params.subscribe((params) => {
      let id = params['id'];
      console.log('wonderful id ===', id);
      this.http
        .post<any>('/api/trips/add', {
          trip: this.trip.value,
          organizer: id,
        })
        .subscribe((result) => {
          console.log('navigate to profile after adding trip');
          console.log('====================================');
          console.log('result after saving trip is ==> ', result);
          console.log('====================================');
          this.router.navigate([`/organizers/${id}/profile`]);
        });
    });
  }
}
