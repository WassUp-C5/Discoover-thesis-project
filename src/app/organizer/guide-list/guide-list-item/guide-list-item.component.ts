import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-guide-list-item',
  templateUrl: './guide-list-item.component.html',
  styleUrls: ['./guide-list-item.component.css'],
})
export class GuideListItemComponent implements OnInit {
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
