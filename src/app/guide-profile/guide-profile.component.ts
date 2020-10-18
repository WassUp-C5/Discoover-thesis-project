import { Component, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { HttpService } from '../http.service'

@Component({
  selector: 'app-guide-profile',
  templateUrl: './guide-profile.component.html',
  styleUrls: ['./guide-profile.component.css']
})
export class GuideProfileComponent implements OnInit {
  // spokenL = [{language:'arabic',
  // level: "Native"},];
  userData: Array<any>;
  language: string ='';
  selectedLevel: string = '';

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.getUserData('id from db').subscribe(data => {
      console.log('data is response',data)
      this.userData = data;
    } )
  }

  changeLanguageHandler(event: any) {
    this.language = event.target.value;
    console.log('the lenguage ===>', this.language)
  }

  changeLevelHandler(event: any) {
    this.selectedLevel = event.target.value;
    console.log('the lenguage level ===>', this.selectedLevel);
  }

  saveData() {
    this.http.post<any>("/api/users/guide/profile/edit", , httpOptions)
    .pipe(
      catchError(this.handleError('addHero', hero))
    );
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
