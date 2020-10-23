import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
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
}
