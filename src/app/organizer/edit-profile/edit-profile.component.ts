import { Component, OnInit } from '@angular/core';
import Organizer from 'src/app/models/Organizer';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  organizer = new Organizer();

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
        this.organizer = new Organizer(user);
      });
  }

  // Edit organizer profile
  onClick() {
    this.usersService.setOrganizerData(this.organizer).subscribe((res) => {
      console.log(res);
    });
    window.location.reload();
  }
}
