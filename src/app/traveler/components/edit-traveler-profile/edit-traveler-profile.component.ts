import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';
import Traveler from 'src/app/models/Traveler';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-traveler-profile',
  templateUrl: './edit-traveler-profile.component.html',
  styleUrls: ['./edit-traveler-profile.component.css'],
})
export class EditTravelerProfileComponent implements OnInit {
  traveler = new Traveler();
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
        this.traveler = new Traveler(user);
      });
  }

  // Edit traveler profile
  onClick() {
    this.usersService.setOrganizerData(this.tokenStorage.getUser().id, this.traveler).subscribe((res) => {
      this._flashMessagesService.show('Data saved successfully', {
        cssClass: 'alert-success',
        timeout: 3000,
      });
    });
    window.location.reload();
  }
}
