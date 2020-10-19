import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/User';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router) {}
  user = new User();
  repeatPassword = '';

  confirmPassword() {
    return this.user.password === this.repeatPassword;
  }

  ngOnInit(): void {

  }
  onSubmit() {
    console.log(this.user);
    this.user.roles.push(this.route.snapshot.paramMap.get('role'));
    this.http
      .post<any>('/api/auth/signup', this.user)
      .subscribe((result) => {
        this.router.navigate(['/']);
      });
  }
}
