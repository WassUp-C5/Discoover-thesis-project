import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuideNavBarComponent } from './guide-navbar/guide-navbar.component';
import { OrganizerProfileComponent } from './organizer-profile/organizer-profile.component';
import { SignupComponent } from './signup/signup.component';
import { GuideATripComponent } from './guide-a-trip/guide-a-trip.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { OrganizeATripComponent } from './organize-a-trip/organize-a-trip.component';
import { SearchTripComponent } from './search-trip/search-trip.component';
import { SigninComponent } from './signin/signin.component';

import {SignupComponent} from './signup/signup.component';

const routes: Routes = [
  {path: '', component:LandingPageComponent},
  {path :'searchTrip', component:SearchTripComponent},
  {path :'OrganizeTrip',component:OrganizeATripComponent},
  {path :'GuideTrip', component :GuideATripComponent},
  {path : 'signup',component:SignupComponent},
  {path : 'signin',component:SigninComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
