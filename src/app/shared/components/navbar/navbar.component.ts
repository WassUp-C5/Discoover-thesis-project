import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  onClick(){
    this.tokenStorage.signOut()
    this.router.navigate(["/"]);
  }
}
