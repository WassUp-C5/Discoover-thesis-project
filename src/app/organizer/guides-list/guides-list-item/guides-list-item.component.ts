import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-guides-list-item',
  templateUrl: './guides-list-item.component.html',
  styleUrls: ['./guides-list-item.component.css'],
})
export class GuidesListItemComponent implements OnInit {
  @Input() guide;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  getGuideInfo() {
    this.activatedRoute.params.subscribe((params) => {
      let id;
      if (params['id']) {
        id = params['id'];
      }
      if (params['tripId']) {
        id = params['tripId'];
      }
      this.router.navigate([`/guide/${this.guide._id}/profile/${id}`]);
    });
  }
}
