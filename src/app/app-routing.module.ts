import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizerProfileComponent } from './organizer/organizer-profile/organizer-profile.component';
import { TripDetailsComponent } from './organizer/trip-details/trip-details.component';
import { GuideListComponent } from './organizer/guide-list/guide-list.component';

import { GuideATripComponent } from './guide/guide-a-trip/guide-a-trip.component';
import { GuideProfileComponent } from './guide/guide-profile/guide-profile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { OrganizeATripComponent } from './organizer/organize-a-trip/organize-a-trip.component';
import { EditTripComponent } from './organizer/edit-trip-component/edit-trip.component';
import { SearchTripComponent } from './search-trip/search-trip.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'searchTrip', component: SearchTripComponent },
  { path: 'organizer/:id/profile', component: OrganizerProfileComponent },
  { path: 'organizer/trip/add/:id', component: OrganizeATripComponent },
  { path: 'organizer/trip/edit/:id', component: EditTripComponent },
  { path: 'organizer/trip/details/:id', component: TripDetailsComponent },
  { path: 'guide/:id/profile', component: GuideProfileComponent },
  { path: 'organizer/trip/details/guides/:id', component: GuideListComponent },
  { path: 'guide/profile', component: GuideProfileComponent },
  { path: 'guide/profile/:tripId/:guideId', component: GuideProfileComponent },
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
