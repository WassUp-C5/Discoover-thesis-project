import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmReservationButtonComponent } from './components/confirm-reservation-button/confirm-reservation-button.component';
/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../angular-material.module';




@NgModule({
  declarations: [ConfirmReservationButtonComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  exports: [
    ConfirmReservationButtonComponent,
    BrowserAnimationsModule,
    AngularMaterialModule
  ]
})
export class SharedModule { }
