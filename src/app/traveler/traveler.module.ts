import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './../shared/angular-material.module';

import { ProfileComponent } from './components/profile/profile.component';
import { BookedTripComponent } from './components/booked-trip/booked-trip.component';
import { SharedModule } from '../shared/shared.module';
import { MyBookingsListComponent } from './components/my-bookings-list/my-bookings-list.component';
import { AppRoutingModule } from './../app-routing.module';


@NgModule({
  declarations: [ProfileComponent,MyBookingsListComponent, BookedTripComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModule,
    SharedModule,
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ProfileComponent,
    MyBookingsListComponent,
    BookedTripComponent,
  ]
})
export class TravelerModule { }
