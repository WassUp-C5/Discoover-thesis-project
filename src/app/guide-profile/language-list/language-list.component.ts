import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.css']
})
export class LanguageListComponent implements OnInit {

  languageAdded: string ="";
  selectedLevelAdded: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  changeLanguageHandler(event: any) {
    this.languageAdded = event.target.value;
    console.log('the lenguage ===>', this.languageAdded)
  }

  changeLevelHandler(event: any) {
    this.selectedLevelAdded = event.target.value;
    console.log('the lenguage level ===>', this.selectedLevelAdded);
  }
  addLanguageList() {
    let row = document.createElement('div');
    row.className = "row";
    row.innerHTML =`
    <div class="col-md-6">
    <div class="form-group">
    <input let type="text" class="form-control" placeholder="I speak ..." (change)="changeLanguageHandler($event)">
    </div>
    </div>
    <div class="col-md-6">
    <div class="form-group">
      <select class="form-control form-control-sm" (change)="changeLevelHandler($event)">
        <option value="---------">---------</option>
        <option value="Native">Native</option>
        <option value="Fluent">Fluent</option>
        <option value="Profecient">Proficient</option>
        <option value="Moderate">Moderate</option>
        <option value="Basic">Basic</option>
      </select>
    </div>
  </div>`;
    document.querySelector('.addLanguageHere').append(row);
  }
}
