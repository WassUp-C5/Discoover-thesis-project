import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {}

  onClick(userRole) {
    console.log('clicked');
    if (this.tokenStorage.getToken()) {
      if (userRole === 'organizer') {
        this.router.navigate(['/organizer/trips']);
      } else if (userRole === 'guide') {
        this.router.navigate(['/organizer/trips']);
      }
      else {
        this.router.navigate(['/searchTrip']);
      }
    } else {
      this.router.navigate(['/signup/' + userRole]);
    }
  }
}
