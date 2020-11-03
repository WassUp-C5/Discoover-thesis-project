import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() avatar:string;
  currentUser = this.tokenStorage.getUser();

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  signOut() {
    this.tokenStorage.signOut();
    this.router.navigate(['/']);
  }
  goToProfile() {
    this.router.navigate([`/organizer/${this.currentUser.id}/profile`]);
  }
}
