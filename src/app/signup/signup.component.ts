import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import User from './../models/User';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  user = new User();
  submitted = false;
  errorMessage = '';
  avatar = '../../assets/avatar.png';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    let date = new Date();
    this.signupForm = this.formBuilder.group({
      avatarFile: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      // validates date format yyyy-mm-dd
      birthday: [
        '',

        [
          Validators.required,

          Validators.pattern(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      phone_number: ['', [Validators.required, Validators.minLength(8)]],
      location: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onFileSelected(event) {
    var selectedFile = event.target.files[0];
    var reader = new FileReader();

    //var imgtag = document.getElementById("userAvatar");
    //imgtag.title = selectedFile.name;

    reader.onload = (event) => {
      this.avatar = event.target.result as string;
      this.signupForm.patchValue({
        avatarFile: selectedFile,
      });

      this.signupForm.get('avatarFile').updateValueAndValidity();
    };

    reader.readAsDataURL(selectedFile);
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      console.log(this.signupForm.value);
      return;
    }
    console.log(this.signupForm.value);

    this.user = new User(this.signupForm.value);
    this.user.roles.push(this.route.snapshot.paramMap.get('role'));
    console.log('user Roles ', this.user.roles);

    //let userRole = this.route.snapshot.paramMap.get('role');

    let formData = new FormData();
    formData.append('file', this.signupForm.get('avatarFile').value);
    formData.append('user', JSON.stringify(this.user));
    // console.log('Form ===> ', formData);
    // console.log('User ===> ', this.user);

    this.authService.register(formData).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/']);
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.signupForm.reset();
  }
}
