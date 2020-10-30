import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './../angular-material.module';

import { ProfileComponent } from './components/profile/profile.component';
import { BookedTripComponent } from './components/booked-trip/booked-trip.component';



@NgModule({
  declarations: [ProfileComponent, BookedTripComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ProfileComponent,
    BookedTripComponent
  ]
})
export class TravelerModule { }
