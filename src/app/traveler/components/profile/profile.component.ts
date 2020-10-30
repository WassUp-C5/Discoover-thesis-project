import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Traveler from 'src/app/models/Traveler';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileOwner: Traveler = new Traveler();
  currentUser: any = this.tokenStorage.getUser();
  bookedTrips: any[];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (param['id']) {
        this.profileOwner.id = param['id'];

        this.getTravelerData(this.profileOwner.id);
      }
    });
  }

  getTravelerData(id) {
    this.http.get(`/api/users/travelers/${id}`).subscribe((user) => {
      console.log(user);
      this.profileOwner = new Traveler(user);
      console.log(this.profileOwner);
    });
  }
}
