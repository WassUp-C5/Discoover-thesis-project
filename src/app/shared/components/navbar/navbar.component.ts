import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';
import User from 'src/app/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  isLoggedIn = !!this.tokenStorage.getUser();
  user: User;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private tokenStorage: TokenStorageService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(){
    if(this.isLoggedIn){
      let userId = this.tokenStorage.getUser().id;
      let userRole = this.tokenStorage.getUser().roles[1];
      this.getConnectedUserData(userId, userRole);

    }
  }

  getConnectedUserData(id, role){
    this.usersService.getCurrentConnectedUser(id, role).subscribe((user: User) => {
      this.user = new User(user);
      console.log(user);
    })
  }

  signOut() {
    this.tokenStorage.signOut();
    this.router.navigate(['/']);
  }
  goToProfile() {
    this.router.navigate([`/${this.user.roles[1]}/${this.user.id}/profile`]);
  }

}
