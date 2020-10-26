import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trip-details-vistor',
  templateUrl: './trip-details-vistor.component.html',
  styleUrls: ['./trip-details-vistor.component.css']
})
export class TripDetailsVistorComponent implements OnInit {
  @Input()
  trip;
  constructor() { }

  ngOnInit(): void {
  }

}
