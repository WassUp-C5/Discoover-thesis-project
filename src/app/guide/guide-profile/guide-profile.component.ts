import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";


// import { User } from './../models/User';

@Component({
  selector: 'app-guide-profile',
  templateUrl: './guide-profile.component.html',
  styleUrls: ['./guide-profile.component.css'],
})
export class GuideProfileComponent implements OnInit {

  constructor(private http: HttpClient, private activatedRoute : ActivatedRoute, private router: Router) {}

  guide = {
     username : '',
     first_name : '',
     last_name : '',
     gender : '',
     location : '',
     email : '',
     password : '',
     bio : '',
     phone_number : '',
     qualifications : []
  }
  // guideUser: User;
  // userQualifications: Array<any>;
  // userData: Array<any>;
  language: string = '';
  selectedLevel: string = '';
  fullName = '';
  // @Input() qualification;
  // @Input() type;



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['guideId'];

    this.http
      .get('/api/user/guide/'+id)
      .subscribe((res : any) => {
        console.log('on init guide infos',res);
        this.guide = res;
        this.fullName = this.guide.first_name + ' ' + this.guide.last_name;
        this.guide.qualifications = res.qualifications;
        console.log('user qualification ==>', this.guide.qualifications)
      });
    })
  }

  genderHandler(event: any){
    this.guide.gender = event.target.value;
    console.log(this.guide.gender)
  }

  changeLanguageHandler(event: any) {
    this.language = event.target.value;
    console.log('the language ===>', this.language);
  }

  changeLevelHandler(event: any) {
    this.selectedLevel = event.target.value;
    console.log('the lenguage level ===>', this.selectedLevel);
  }

  saveData() {
    window.location.reload();
    this.guide.qualifications.push({language : this.language, level : this.selectedLevel})
    console.log('guide profile updated with ==>', this.guide)
    this.http.put<any>("/api/user/guide/edit",this.guide )
    .subscribe(data => {
      console.log(data);
      })
  }
  hire(){
    this.activatedRoute.params.subscribe(params => {
      let tripId = params['tripId'];
      let guideId = params['guideId'];
      console.log('trip id ====>', tripId);
      console.log('guide id ====>', `/api/trips/${tripId}/edit`);
      this.http.put(`/api/trips/${tripId}/edit`,{guide : guideId})

      .subscribe(result=>{
        console.log(result);

      })

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
