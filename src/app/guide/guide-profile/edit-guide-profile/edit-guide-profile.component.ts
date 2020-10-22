import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-guide-profile',
  templateUrl: './edit-guide-profile.component.html',
  styleUrls: ['./edit-guide-profile.component.css']
})
export class EditGuideProfileComponent implements OnInit {

  @Input() guide;

  language: string = '';
  selectedLevel: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  saveData() {
    window.location.reload();
    this.guide.qualifications.push({
      language: this.language,
      level: this.selectedLevel,
    });
    console.log('guide profile updated with ==>', this.guide);
    this.http.put<any>('/api/user/guide/edit', this.guide).subscribe((data) => {
      console.log(data);
    });
  }

}
