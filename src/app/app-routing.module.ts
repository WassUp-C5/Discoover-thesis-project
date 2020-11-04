import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizerProfileComponent } from './organizer/organizer-profile/organizer-profile.component';
import { TripDetailsComponent } from './organizer/trip-details/trip-details.component';
import { GuideListComponent } from './organizer/guide-list/guide-list.component';
import { TripDetailsVistorComponent } from './search-trip/trip-details-vistor/trip-details-vistor.component';

import { GuideATripComponent } from './guide/guide-a-trip/guide-a-trip.component';
import { GuideProfileComponent } from './guide/guide-profile/guide-profile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { OrganizeATripComponent } from './organizer/organize-a-trip/organize-a-trip.component';
import { EditTripComponent } from './organizer/edit-trip-component/edit-trip.component';
import { SearchTripComponent } from './search-trip/search-trip.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './traveler/components/profile/profile.component';
import { LandComponent } from './land/land.component';
const routes: Routes = [
  { path: '', component: LandComponent },
  { path: 'searchTrip', component: SearchTripComponent },
  { path: 'organizer/:id/profile', component: OrganizerProfileComponent },
  { path: 'organizer/:id/trip/add', component: OrganizeATripComponent },
  { path: 'organizer/trip/edit/:id', component: EditTripComponent },
  { path: 'organizer/trip/details/:tripId', component: TripDetailsComponent },
  { path: 'guide/:id/profile', component: GuideProfileComponent },
  {
    path: 'organizer/trip/details/guides/:tripId/:location',
    component: GuideListComponent,
  },
  { path: 'guide/:guideId/profile/:tripId', component: GuideProfileComponent },
  { path: 'guideTrip', component: GuideATripComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup/:role', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'trips/:id/details', component: TripDetailsVistorComponent },
  { path: 'traveler/:id/profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
