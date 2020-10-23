import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-guide-navbar',
  templateUrl: './guide-navbar.component.html',
  styleUrls: ['./guide-navbar.component.css']
})
export class GuideNavBarComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onClick(){
    this.tokenStorage.signOut()
    this.router.navigate(["/"]);
  }

}
