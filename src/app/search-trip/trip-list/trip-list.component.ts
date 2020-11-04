import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
})
export class TripListComponent implements OnInit {
  @Input()
  trips: [];
  p: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
}
