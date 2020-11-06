import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmReservationButtonComponent } from './components/confirm-reservation-button/confirm-reservation-button.component';
/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';




@NgModule({
  declarations: [ConfirmReservationButtonComponent, NavbarComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlashMessagesModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [
    ConfirmReservationButtonComponent,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NavbarComponent
  ]
})
export class SharedModule { }
