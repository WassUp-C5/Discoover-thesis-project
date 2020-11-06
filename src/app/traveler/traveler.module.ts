import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './../shared/angular-material.module';

import { ProfileComponent } from './components/profile/profile.component';
import { BookedTripComponent } from './components/booked-trip/booked-trip.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ProfileComponent, BookedTripComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    SharedModule,
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ProfileComponent,
    BookedTripComponent,
  ]
})
export class TravelerModule { }
