import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-guide-list-item',
  templateUrl: './guide-list-item.component.html',
  styleUrls: ['./guide-list-item.component.css']
})
export class GuideListItemComponent implements OnInit {
  @Input() guide;
  constructor() { }

  ngOnInit(): void {

  }

}
