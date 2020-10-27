import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/User';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  user = new User();
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      // validates date format yyyy-mm-dd
      // birthday: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.pattern(
      //       /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
      //     ),
      //   ],
      // ],
      phone_number: ['', [Validators.required, Validators.minLength(8)]],
      location: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      console.log(this.signupForm.value);
      return;
    }

    console.log('Form ===> ', this.signupForm.value);
    this.user = new User(this.signupForm.value);
    console.log('User ===> ', this.user);
    this.user.roles.push(this.route.snapshot.paramMap.get('role'));

    this.authService.register(this.user).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/']);
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.signupForm.reset();
  }
}
