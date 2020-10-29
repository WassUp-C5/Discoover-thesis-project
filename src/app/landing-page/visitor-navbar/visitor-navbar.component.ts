import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-visitor-navbar',
  templateUrl: './visitor-navbar.component.html',
  styleUrls: ['./visitor-navbar.component.css'],
})
export class VisitorNavbarComponent implements OnInit {
  isLoggedIn = false;
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private urlService: UrlService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getUser();
  }

  onClick() {
    if (this.isLoggedIn) {
      this.tokenStorage.signOut();
      window.location.reload();
    } else {
      let url = this.router.url;
      console.log(url);

      this.urlService.setPreviousUrl(url)
      this.router.navigate(['/signin']);
    }
  }
}
