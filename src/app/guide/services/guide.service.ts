import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  constructor() { }

  // getGuide() {
  //   this.http.get(`/api/user/guide/${this.guideId}`).subscribe((guide: any) => {
  //     this.guide = guide;
  //     console.log('New guide ==>', this.guide);
  //   });
  // }
}
