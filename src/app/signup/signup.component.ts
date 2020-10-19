import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

<<<<<<< HEAD
=======

import { HttpClient } from '@angular/common/http';
import { User } from './../models/User';
import { ActivatedRoute, Router } from '@angular/router';
>>>>>>> 3f1ab8e4dec78cc37d0a4e1f26a3e61962927654
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
<<<<<<< HEAD
  useer: FormGroup;
=======
  user: FormGroup;
>>>>>>> 3f1ab8e4dec78cc37d0a4e1f26a3e61962927654
  submitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute,private router: Router) {}

  ngOnInit() {
    this.user = this.formBuilder.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      // validates date format yyyy-mm-dd
      birthday: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      phone_number: ['', [Validators.required, Validators.minLength(8)]],
      location: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  get f() {
    return this.user.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.user.invalid) {
      return;
    }

<<<<<<< HEAD
    console.log(this.useer.value);
  }

  onReset() {
    this.submitted = false;
    this.useer.reset();
  }
=======
    console.log(this.user);
    this.user.roles.push(this.route.snapshot.paramMap.get('role'));
    this.http
      .post<any>('/api/auth/signup', this.user)
      .subscribe((result) => {
        this.router.navigate(['/']);
      });
  }


  onReset() {
    this.submitted = false;
    this.user.reset();
  }
 
>>>>>>> 3f1ab8e4dec78cc37d0a4e1f26a3e61962927654
}
