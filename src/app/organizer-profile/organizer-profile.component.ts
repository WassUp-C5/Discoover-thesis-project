import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.css']
})
export class OrganizerProfileComponent implements OnInit {

  constructor(private http: HttpClient) {

   }
   selectedGender = '';
   organizer = {
     first_name : 'Slim',
     last_name : 'Kasraoui',
     gender : this.selectedGender,
     location : 'RBK',
     email : 'slim@wassup.io',
     password : '',
     bio : 'Hello world I\'m Slim and I\'m supposed to describe myself here',
     phone_number : '22222222'
    };
    fullName = this.organizer.first_name + ' ' + this.organizer.last_name;

  ngOnInit(): void {
  }
  onClick(){
    console.log('organizer profile updated with ==>', this.organizer);
    this.http.post('/api/user/edit',this.organizer)
    .subscribe((res)=>{
      console.log(res)
    })


  }

}
