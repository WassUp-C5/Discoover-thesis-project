import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { BookedTripsComponent } from './components/booked-trips/booked-trips.component';



@NgModule({
  declarations: [ProfileComponent, BookedTripsComponent],
  imports: [
    CommonModule
  ]
})
export class TravelerModule { }
