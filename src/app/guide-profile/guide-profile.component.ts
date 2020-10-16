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
    row.className = "row";
    row.innerHTML = `
    <div class="col-md-6">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="I speak ...">
        </div>
    </div>
    <div class="col-md-6">
        <div class="form-group">
          <select class="form-control form-control-sm" id="levelList">
            <option>Native</option>
            <option>Fluent</option>
            <option>Proficient</option>
            <option>Moderate</option>
            <option>Basic</option>
          </select>
        </div>
    </div>
</div>`;
    document.querySelector('.addLanguageHere').append(row);
  }
}
