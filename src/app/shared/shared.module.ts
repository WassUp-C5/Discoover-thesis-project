import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmReservationButtonComponent } from './components/confirm-reservation-button/confirm-reservation-button.component';
/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlashMessagesModule } from 'angular2-flash-messages';




@NgModule({
  declarations: [ConfirmReservationButtonComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlashMessagesModule.forRoot(),
  ],
  exports: [
    ConfirmReservationButtonComponent,
    BrowserAnimationsModule,
    AngularMaterialModule
  ]
})
export class SharedModule { }
