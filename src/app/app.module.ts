import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {MatButtonModule} from '@angular/material/button';
import { SearchTripComponent } from './search-trip/search-trip.component';
import { OrganizeATripComponent } from './organize-a-trip/organize-a-trip.component';
import { GuideATripComponent } from './guide-a-trip/guide-a-trip.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SearchTripComponent,
    OrganizeATripComponent,
    GuideATripComponent
  ],
  imports: [
   
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
