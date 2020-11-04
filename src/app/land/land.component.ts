import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-land',
  templateUrl: './land.component.html',
  styleUrls: ['./land.component.css'],
})
export class LandComponent implements OnInit {
  currentUser = this.tokenStorage.getUser();
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {}

  onClick(userRole) {
    console.log('clicked');
    if (this.tokenStorage.getToken()) {
      if (userRole === 'organizer') {
        if (this.tokenStorage.getUser().roles.includes('organizer')) {
          this.router.navigate([`/organizer/${this.currentUser.id}/profile`]);
        } else {
          this.router.navigate(['/signup/' + userRole]);
        }
      } else if (userRole === 'guide') {
        if (this.tokenStorage.getUser().roles.includes('guide')) {
          this.router.navigate([`/guide/${this.currentUser.id}/profile`]);
        } else {
          this.router.navigate(['/signup/' + userRole]);
        }
      } else {
        this.router.navigate(['/searchTrip']);
      }
    } else {
      if (userRole === 'traveler') {
        this.router.navigate(['/searchTrip']);
      } else {
        this.router.navigate(['/signup/' + userRole]);
      }
    }
  }
  sendEmail(e: Event) {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_8juivyq',
        'template_7woxrfa',
        e.target as HTMLFormElement,
        'user_Df3eSWiFhwMtbedp2beNW'
      )
      .then(
        (result: EmailJSResponseStatus) => {
          console.log(result.text);
          window.location.reload();
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
}
