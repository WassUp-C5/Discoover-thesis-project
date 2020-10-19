import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],

  encapsulation: ViewEncapsulation.None,
})
export class SigninComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private authService: AuthService) {}
  credentials = {
    username: '',
    password: '',
  };
  ngOnInit(): void {
    document.body.classList.add('background-img');
  }
  ngOnDestroy() {
    // remove the class form body tag
    document.body.classList.add('background-img');
  }
  onSubmit() {
    console.log('Your form data : ', this.credentials);
  }
}
