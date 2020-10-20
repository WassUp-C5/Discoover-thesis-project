import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizerProfileComponent } from './organizer/organizer-profile/organizer-profile.component';
import { OrganizerMyTripsComponent } from './organizer/organizer-my-trips/organizer-my-trips.component';
import { GuideATripComponent } from './guide/guide-a-trip/guide-a-trip.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { OrganizeATripComponent } from './organizer/organize-a-trip/organize-a-trip.component';
import { SearchTripComponent } from './search-trip/search-trip.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'searchTrip', component: SearchTripComponent },
  { path: 'organizer/profile', component: OrganizerProfileComponent },
  { path: 'organizer/trip/add', component: OrganizeATripComponent },
  { path: 'organizer/trips', component: OrganizerMyTripsComponent },
  { path: 'guideTrip', component: GuideATripComponent },
  { path: 'signup', component: SignupComponent },
  {path : 'signup/:role',component:SignupComponent},
  { path: 'signin', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
