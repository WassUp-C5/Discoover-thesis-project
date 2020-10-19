import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
<<<<<<< HEAD
})
export class SigninComponent implements OnInit {
  constructor() {}
  useer = {
    username: '',
    password: '',
  };
  ngOnInit(): void {}
  signIn() {
    console.log('Your form data : ', this.useer);
=======

  encapsulation: ViewEncapsulation.None,
})
export class SigninComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
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
>>>>>>> 3f1ab8e4dec78cc37d0a4e1f26a3e61962927654
  }
}
