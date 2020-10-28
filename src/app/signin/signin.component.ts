import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],

  encapsulation: ViewEncapsulation.None,
})
export class SigninComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  isLoginFailed = false;
  credentials = {
    username: '',
    password: '',
  };
  errorMessage = '';
  roles: string[] = [];
  previousUrl: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private urlService: UrlService
  ) {}

  ngOnInit(): void {
    document.body.classList.add('background-img');
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(['/']);
    }

    this.urlService.previousUrl$.subscribe((previousUrl: string) => {
      this.previousUrl = previousUrl;
    });
  }
  ngOnDestroy() {
    // remove the class form body tag
    document.body.classList.remove('background-img');
  }
  onSubmit() {
    console.log('Your form data : ', this.credentials);
    this.authService.login(this.credentials).subscribe(
      (data) => {
        console.log(data);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.user);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        //this.reloadPage();
        this.router.navigate([
          `/${this.roles[1]}/${this.tokenStorage.getUser().id}/profile`,
        ]);
        // this.router.navigateByUrl(this.previousUrl);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
