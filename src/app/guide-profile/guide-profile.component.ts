import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guide-profile',
  templateUrl: './guide-profile.component.html',
  styleUrls: ['./guide-profile.component.css']
})
export class GuideProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  addLanguage() {
    let row = document.createElement('div');
    row.className="row";
    row.innerHTML = `<input type="text" class="form-control" placeholder="I speak ...">`;
    document.querySelector('.addLanguageArea').appendChild(row);

  }
}
