import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-trip-item',
  templateUrl: './trip-item.component.html',
  styleUrls: ['./trip-item.component.css']
})
export class TripItemComponent implements OnInit {
@Input()
  trip;

  constructor() { }

  ngOnInit(): void {

  }

}
