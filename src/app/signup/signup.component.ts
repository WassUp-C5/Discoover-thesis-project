import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignupComponent implements OnInit {
  constructor() {}
  user = {
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
  };
  repeatPassword = '';

  confirmPassword() {
    return this.user.password === this.repeatPassword;
  }

  ngOnInit(): void {}
  onSubmit() {

  }
}
