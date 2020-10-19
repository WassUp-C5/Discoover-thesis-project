import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

import { User } from './../models/User';

@Component({
  selector: 'app-guide-profile',
  templateUrl: './guide-profile.component.html',
  styleUrls: ['./guide-profile.component.css'],
})
export class GuideProfileComponent implements OnInit {
  // spokenL = [{language:'arabic',
  // level: "Native"},];
  guideUser: User;
  userQualifications: Array<any>;
  userData: Array<any>;
  language: string = '';
  selectedLevel: string = '';
  @Input() qualification;
  @Input() type;


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<User>('/api/user/5f8af2f5d7ebfa75d4997522')
      .subscribe((user) => {
        console.log(user);
        this.guideUser = user;
        this.userQualifications = user.qualifications;
        console.log('user qualification ==>', this.userQualifications)
      });
  }

  changeLanguageHandler(event: any) {
    this.language = event.target.value;
    console.log('the lenguage ===>', this.language);
  }

  changeLevelHandler(event: any) {
    this.selectedLevel = event.target.value;
    console.log('the lenguage level ===>', this.selectedLevel);
  }

  saveData() {
    this.http.post<any>("/api/users/guide/profile/edit",this.guideUser )
    .subscribe(data => {
      console.log(data);
      })
  }


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
