import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  // language = "arabic";
  // languageLevel = "native";
  // levels = ["native","beginner", "average", "advanced"];
  // languageAdded: string ="";
  // selectedLevelAdded: string = "";
  @Input() qualification;
  // @Input() type;

  entryLanguage: string = '';
  entrySelectedLevel: string = '';

  constructor() { }

  ngOnInit(): void {
    console.log(this.qualification)
  }
  changeEntryLanguageHandler(event: any) {
    this.entryLanguage = event.target.value;
    console.log('the entryLanguage ===>', this.entryLanguage);
  }

  changeEntryLevelHandler(event: any) {
    this.entrySelectedLevel = event.target.value;
    console.log('the lenguage level ===>', this.entrySelectedLevel);
  }

  // changeLanguageHandler(event: any) {
  //   this.languageAdded = event.target.value;
  //   console.log('the lenguage ===>', this.languageAdded)
  // }

  // changeLevelHandler(event: any) {
  //   this.selectedLevelAdded = event.target.value;
  //   console.log('the lenguage level ===>', this.selectedLevelAdded);
  // }

}
