import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.css'],
})
export class OrganizerProfileComponent implements OnInit {


  constructor(private http: HttpClient) {}

   selectedGender = '';
   organizer = {
     username : '',
     first_name : '',
     last_name : '',
     gender : '',
     location : '',
     email : '',
     password : '',
     bio : '',
     phone_number : ''
    };
    fullName = '';

  ngOnInit(): void {
    this.http.get('api/user/organizer/5f8af2f5d7ebfa75d4997522')
    .subscribe((res : any)=>{
      console.log(res)
      this.organizer = res;
      this.fullName =
        this.organizer.first_name + ' ' + this.organizer.last_name;
    });
  }
  genderHandler(event: any) {
    this.organizer.gender = event.target.value;
    console.log(this.organizer.gender);
  }
  onClick() {
    window.location.reload();
    console.log('organizer profile updated with ==>', this.organizer);

    this.http.put('/api/user/organizer/edit',this.organizer)
    .subscribe((res)=>{
      console.log(res);
    });
  }
}
