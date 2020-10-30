import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import User from 'src/app/models/User';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileOwner: User = new User();
  currentUser: any = this.tokenStorage.getUser();
  bookedTrips:any[];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if(param['id']){
        this.profileOwner.id = param['id'];
        this.getUser(this.profileOwner.id);
      }
    })

  }

  getUser(id) {
    this.http.get(`/api/users/travelers/${id}`).subscribe((user) => {
      this.profileOwner = new User(user);
      console.log(this.profileOwner)
    });
  }
}
