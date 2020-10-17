import { Component, OnInit } from '@angular/core';

import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }
   user = {
    user_name : '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',

  }


  ngOnInit(): void {
  }
    onSubmit() {

      console.log('Your form data : ', this.user);
  }


}
