import { Component, OnInit } from '@angular/core';
import Organizer from 'src/app/models/Organizer';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  organizer = new Organizer();

  constructor(
    private usersService: UsersService,
    private tokenStorage: TokenStorageService,
    private _flashMessagesService: FlashMessagesService
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
    this.usersService.setOrganizerData(this.tokenStorage.getUser().id, this.organizer).subscribe((res) => {
      this._flashMessagesService.show('Data saved successfully', {
        cssClass: 'alert-success',
        timeout: 3000,
      });
    });
   // window.location.reload();
  }
}
