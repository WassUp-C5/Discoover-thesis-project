import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.css']
})
export class OrganizerProfileComponent implements OnInit {

  constructor() {
   }
   organizer = {
     firstName : 'Amine',
     lastName : 'Louati',
     gender : '',
     location : 'Tunis',
     email : 'amine@louati.io',
     password : '',
     bio : 'Hello world I\'m Amine and I\'m awesome'
    };
    fullName = this.organizer.firstName + ' ' + this.organizer.lastName;

  ngOnInit(): void {
  }
  onClick(){
    console.log('organizer profile updated with ==>', this.organizer)

  }

}
