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
import { EditTravelerProfileComponent } from './components/edit-traveler-profile/edit-traveler-profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent,MyBookingsListComponent, EditTravelerProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
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
    EditTravelerProfileComponent,
  ],
})
export class TravelerModule {}
