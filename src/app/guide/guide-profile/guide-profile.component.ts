import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

// import { User } from './../models/User';

@Component({
  selector: 'app-guide-profile',
  templateUrl: './guide-profile.component.html',
  styleUrls: ['./guide-profile.component.css'],
})
export class GuideProfileComponent implements OnInit {
  guide = {
    username: '',
    first_name: '',
    last_name: '',
    gender: '',
    location: '',
    email: '',
    password: '',
    bio: '',
    phone_number: '',
    qualifications: [],
  };
  currentUser = this.tokenStorage.getUser();


  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.http
      .get(`/api/user/guide/${this.currentUser.id}`)
      .subscribe((res: any) => {
        console.log('on init guide infos', res);
        this.guide = res;
        this.guide.gender = 'Male';
        console.log( this.guide);
        this.guide.qualifications = res.qualifications;
        console.log('user qualification ==>', this.guide.qualifications);
      });
  }

  // genderHandler(event: any) {
  //   this.guide.gender = event.target.value;
  //   console.log(this.guide.gender);
  // }

  // changeLanguageHandler(event: any) {
  //   this.language = event.target.value;
  //   console.log('the language ===>', this.language);
  // }

  // changeLevelHandler(event: any) {
  //   this.selectedLevel = event.target.value;
  //   console.log('the lenguage level ===>', this.selectedLevel);
  // }



  //   addLanguage() {
  //     let row = document.createElement('div');
  //     row.className = "row";
  //     row.innerHTML = `
  //     <div class="col-md-6">
  //         <div class="form-group">
  //             <input type="text" class="form-control" placeholder="spokenL[0].">
  //         </div>
  //     </div>
  //     <div class="col-md-6">
  //         <div class="form-group">
  //           <select class="form-control form-control-sm" id="levelList">
  //             <option>Native</option>
  //             <option>Fluent</option>
  //             <option>Proficient</option>
  //             <option>Moderate</option>
  //             <option>Basic</option>
  //           </select>
  //         </div>
  //     </div>
  // </div>`;
  //     document.querySelector('.addLanguageHere').append(row);
  //   }
}
