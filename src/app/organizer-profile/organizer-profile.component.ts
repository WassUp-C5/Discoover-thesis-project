import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.css'],
})
@Injectable()
export class OrganizerProfileComponent implements OnInit {
  currentUser: any;
  selectedGender = '';
  organizer = {
    first_name: '',
    last_name: '',
    gender: '',
    location: '',
    email: '',
    password: '',
    bio: '',
    phone_number: '',
  };
  fullName = '';

  constructor(private http: HttpClient, private token: TokenStorageService) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    // this.http.get('api/user/5f8af2f5d7ebfa75d4997522').subscribe((res: any) => {
    //   console.log(res);
    //   this.organizer = res;
    //   this.fullName =
    //     this.organizer.first_name + ' ' + this.organizer.last_name;
    // });
  }
  genderHandler(event: any) {
    this.organizer.gender = event.target.value;
    console.log(this.organizer.gender);
  }
  onClick() {
    window.location.reload();
    console.log('organizer profile updated with ==>', this.organizer);
    this.http.put('/api/user/edit', this.organizer).subscribe((res) => {
      console.log(res);
    });
  }
}
