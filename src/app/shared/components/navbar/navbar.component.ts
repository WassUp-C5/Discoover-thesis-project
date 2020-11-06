import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';
import User from 'src/app/models/User';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = !!this.tokenStorage.getUser();
  user = new User();
  route: string;
  session: any;

  @ViewChild('drawer') sidenav: any;
  toggleSidenav() {
    this.sidenav.toggle();
    console.log(this.sidenav.toggle);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  currentRoute: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private tokenStorage: TokenStorageService,
    private usersService: UsersService,
    private router: Router,
    private location: Location
  ) {
    router.events.subscribe((event) => {
      this.route = location.path();
      this.isLoggedIn = !!this.tokenStorage.getUser();
    });
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.route = this.location.path();
      this.isLoggedIn = !!this.tokenStorage.getUser();
    });
    // this.isLoggedIn = !!this.tokenStorage.getUser();
    this.session = this.tokenStorage;
    console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      let userId = this.tokenStorage.getUser().id;
      let userRole = this.tokenStorage.getUser().roles[1];
      this.getConnectedUserData(userId, userRole);
    }
  }

  getConnectedUserData(id, role) {
    this.usersService
      .getCurrentConnectedUser(id, role)
      .subscribe((user: User) => {
        this.user = new User(user);
        console.log(user);
      });
  }

  signOut() {
    this.tokenStorage.signOut();
    this.isLoggedIn = !!this.tokenStorage.getUser();
    this.router.navigate(['/']);
  }
  goToProfile(drawer) {
    this.router.navigate([`/${this.user.roles[1]}s/${this.user.id}/profile`]);
    drawer.close();
  }

  showMyTrips(drawer) {
    this.router.navigate([`/${this.user.roles[1]}s/${this.user.id}/trips`]);
    drawer.close();
  }

  showSettings(drawer) {
    this.router.navigate([
      `/${this.user.roles[1]}s/${this.user.id}/profile/settings`,
    ]);
    drawer.close();
  }

  showPublicTrips(drawer) {
    this.router.navigate([`/searchTrip`]);
    drawer.close();
  }

  showPropsals(drawer) {
    this.router.navigate([`/organizers/${this.user.id}/proposals`]);
    drawer.close();
  }
}
