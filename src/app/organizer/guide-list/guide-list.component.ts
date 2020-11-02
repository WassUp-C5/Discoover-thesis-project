import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guide-list',
  templateUrl: './guide-list.component.html',
  styleUrls: ['./guide-list.component.css']
})
export class GuideListComponent implements OnInit {
guidesList: Array<any>;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      this.http
         .get('/api/users/guides')
         .subscribe((res : any) => {
           console.log('on init guide infos',res);
           this.guidesList = res;
           console.log('this is the guidesList ===>', this.guidesList);
         });
  }
}
