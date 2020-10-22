import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { OrganizerMyTripsComponent } from './organizer/organizer-my-trips/organizer-my-trips.component';
import { TripDetailsComponent } from './organizer/trip-details/trip-details.component';


/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';

import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

import { GuideNavBarComponent } from './guide/guide-navbar/guide-navbar.component';
import { OrganizerProfileComponent } from './organizer/organizer-profile/organizer-profile.component';

import { ReactiveFormsModule } from '@angular/forms';
import { GuideListComponent } from './organizer/guide-list/guide-list.component';
import { GuideListItemComponent } from './organizer/guide-list/guide-list-item/guide-list-item.component';
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
    EntryComponent,
    OrganizerNavbarComponent,
    OrganizerMyTripsComponent,

    OrganizerNavbarComponent,

    GuideListComponent,

    GuideListItemComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})

export class AppModule {}
