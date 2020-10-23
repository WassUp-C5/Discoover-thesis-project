import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { TokenStorageService } from './../../../services/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-edit-guide-profile',
  templateUrl: './edit-guide-profile.component.html',
  styleUrls: ['./edit-guide-profile.component.css'],
})
export class EditGuideProfileComponent implements OnInit {
  @Input() guide;

  currentUser: any;
  isLoggedIn: boolean;
  guideId: string;
  language: string = '';
  selectedLevel: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  showErrorMessage: boolean = false;
  showSuccessMessage: boolean = false;
  alertMessage: string;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getUser()) {
      this.currentUser = this.tokenStorage.getUser();
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    this.route.params.subscribe((params) => {
      this.guideId = params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
  }

  saveData() {
    console.log('guide profile updated with ==>', this.guide);
    this.http
      .put<any>(`/api/users/guides/${this.guideId}/edit`, this.guide)
      .subscribe((data) => {
        console.log(data);
      });
  }

  changePassword() {
    console.log(this.currentPassword, this.newPassword);
    if (this.currentPassword && this.newPassword) {
      this.http
        .put(`/api/user/${this.currentUser.id}/password/edit`, {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
        })

        .subscribe(
          (result: any) => {
            console.log(result);
            this.alertMessage = result.message;
            this.showSuccessMessage = true;
          },
          (error) => {
            console.log(error);
            this.alertMessage = error.error.message;
            this.showErrorMessage = true;
          }
        );
    } else {
      this.alertMessage = 'Please check your password again!!';
      this.showErrorMessage = true;
    }

    setTimeout(() => {
      this.showErrorMessage = false;
      this.showSuccessMessage = false;
    }, 5000);
  }

}
