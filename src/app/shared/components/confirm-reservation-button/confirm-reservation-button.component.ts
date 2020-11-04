import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-reservation-button',
  templateUrl: './confirm-reservation-button.component.html',
  styleUrls: ['./confirm-reservation-button.component.css']
})
export class ConfirmReservationButtonComponent implements OnInit {

  @Input() reservationStatus;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){

  }

}
