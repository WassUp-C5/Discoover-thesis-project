import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-visitor-navbar',
  templateUrl: './visitor-navbar.component.html',
  styleUrls: ['./visitor-navbar.component.css'],
})
export class VisitorNavbarComponent implements OnInit {
  isLoggedIn = false;
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getUser();
  }

  onClick() {
    if (this.isLoggedIn) {
      this.tokenStorage.signOut();
      window.location.reload();
    } else {
      this.router.navigate(['/signin']);
    }
  }
}
