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

/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { GuideNavBarComponent } from './guide/guide-navbar/guide-navbar.component';
import { OrganizerProfileComponent } from './organizer/organizer-profile/organizer-profile.component';

import { HttpClientModule } from '@angular/common/http';
import { OrganizerMyTripsComponent } from './organizer/organizer-my-trips/organizer-my-trips.component';

import { ReactiveFormsModule } from '@angular/forms';
import { OrganizerNavbarComponent } from './organizer/organizer-navbar/organizer-navbar.component';
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

    EntryComponent,
    OrganizerNavbarComponent,
    OrganizerMyTripsComponent,

    OrganizerNavbarComponent,

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
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}
