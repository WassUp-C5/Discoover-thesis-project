import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';
import Traveler from 'src/app/models/Traveler';

@Component({
  selector: 'app-edit-traveler-profile',
  templateUrl: './edit-traveler-profile.component.html',
  styleUrls: ['./edit-traveler-profile.component.css'],
})
export class EditTravelerProfileComponent implements OnInit {
  traveler = new Traveler();
  constructor(
    private usersService: UsersService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    let userId = this.tokenStorage.getUser().id;
    let userRole = this.tokenStorage.getUser().roles[1];
    this.usersService
      .getCurrentConnectedUser(userId, userRole)
      .subscribe((user) => {
        this.traveler = new Traveler(user);
      });
  }

  // Edit traveler profile
  onClick() {
    this.usersService.setOrganizerData(this.traveler).subscribe((res) => {
      console.log(res);
    });
    window.location.reload();
  }
}
