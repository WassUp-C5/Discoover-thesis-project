import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor() {}
  message: String;
  pay: Number;

  messageChange(event) {
    this.message = event.target.value;
  }
  payChange(event) {
    this.pay = event.target.value;
  }
  getData() {
    return { message: this.message, pay: this.pay };
  }

  ngOnInit(): void {}
}
