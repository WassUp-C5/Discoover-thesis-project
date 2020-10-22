import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-organizer-navbar',
  templateUrl: './organizer-navbar.component.html',
  styleUrls: ['./organizer-navbar.component.css'],
})
export class OrganizerNavbarComponent implements OnInit {
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  signOut() {
    this.tokenStorage.signOut();
    this.router.navigate(['/']);
  }
}
