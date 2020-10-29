import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './../angular-material.module';

import { ProfileComponent } from './components/profile/profile.component';
import { BookedTripsComponent } from './components/booked-trips/booked-trips.component';



@NgModule({
  declarations: [ProfileComponent, BookedTripsComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ProfileComponent, BookedTripsComponent
  ]
})
export class TravelerModule { }
