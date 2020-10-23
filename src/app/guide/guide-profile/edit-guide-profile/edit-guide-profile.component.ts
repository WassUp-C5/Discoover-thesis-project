import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-guide-profile',
  templateUrl: './edit-guide-profile.component.html',
  styleUrls: ['./edit-guide-profile.component.css'],
})
export class EditGuideProfileComponent implements OnInit {
  @Input() guide;

  guidep;
  currentUser:any;
  isLoggedIn:boolean;
  guideId:string;
  language:string = '';
  selectedLevel:string = '';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if(this.tokenStorage.getUser()){
      this.currentUser = this.tokenStorage.getUser();
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }

    this.route.params.subscribe(params => {
      this.guideId = params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
  }

  saveData() {
    // window.location.reload();
    // this.guide.qualifications.push({
    //   language: this.language,
    //   level: this.selectedLevel,
    // });
    console.log('guide profile updated with ==>', this.guide);
    this.http.put<any>(`/api/users/guides/${this.guideId}/edit`, this.guide).subscribe((data) => {
      console.log(data);
    });
  }
}
