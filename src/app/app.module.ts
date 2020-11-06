import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/angular-material.module';

import { VisitorNavbarComponent } from './landing-page/visitor-navbar/visitor-navbar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SearchTripComponent } from './search-trip/search-trip.component';
import { OrganizeATripComponent } from './organizer/organize-a-trip/organize-a-trip.component';
import { GuideATripComponent } from './guide/guide-a-trip/guide-a-trip.component';
import { GuideProfileComponent } from './guide/guide-profile/guide-profile.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { EntryComponent } from './guide/guide-profile/entry-list/entry.component';
import { OrganizerNavbarComponent } from './organizer/organizer-navbar/organizer-navbar.component';
import { TripDetailsComponent } from './organizer/trip-details/trip-details.component';
import { EditGuideProfileComponent } from './guide/guide-profile/edit-guide-profile/edit-guide-profile.component';

import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

import { GuideNavBarComponent } from './guide/guide-navbar/guide-navbar.component';
import { OrganizerProfileComponent } from './organizer/organizer-profile/organizer-profile.component';
import { EditTripComponent } from './organizer/edit-trip-component/edit-trip.component';

import { ReactiveFormsModule } from '@angular/forms';
import { GuidesListComponent } from './organizer/guides-list/guides-list.component';
import { GuidesListItemComponent } from './organizer/guides-list/guides-list-item/guides-list-item.component';
import { TripListComponent } from './search-trip/trip-list/trip-list.component';
import { TripItemComponent } from './search-trip/trip-list/trip-item/trip-item.component';
import { TripDetailsVistorComponent } from './search-trip/trip-details-vistor/trip-details-vistor.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { TravelerModule } from './traveler/traveler.module';
import { LandComponent } from './land/land.component';
import { DialogComponent } from './guide/dialog/dialog.component';
import { SharedModule } from './shared/shared.module';
import { EditProfileComponent } from './organizer/edit-profile/edit-profile.component';
import { ProposalsListComponent } from './organizer/proposals-list/proposals-list.component';
import { TripsListComponent } from './organizer/trips-list/trips-list.component';

@NgModule({
  declarations: [
    AppComponent,
    VisitorNavbarComponent,
    LandingPageComponent,
    SearchTripComponent,
    OrganizeATripComponent,
    GuideATripComponent,
    GuideNavBarComponent,
    OrganizerProfileComponent,
    GuideProfileComponent,
    SignupComponent,
    SigninComponent,
    TripDetailsComponent,
    EditGuideProfileComponent,
    EntryComponent,
    OrganizerNavbarComponent,
    OrganizerNavbarComponent,
    EditTripComponent,
    GuidesListComponent,
    GuidesListItemComponent,
    TripListComponent,
    TripItemComponent,
    TripDetailsVistorComponent,
    LandComponent,
    DialogComponent,
    EditProfileComponent,
    ProposalsListComponent,
    TripsListComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TravelerModule,
    FlashMessagesModule.forRoot(),
    GoogleMapsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
