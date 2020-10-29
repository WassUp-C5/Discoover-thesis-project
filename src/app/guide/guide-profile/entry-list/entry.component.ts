import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
})
export class EntryComponent implements OnInit {
  // language = "arabic";
  // languageLevel = "native";
  // levels = ["native","beginner", "average", "advanced"];
  // languageAdded: string ="";
  // selectedLevelAdded: string = "";
  @Input() qualification;
  @Input() deleteUserQualification;
  // @Input() type;

  entryLanguage: string = '';
  entrySelectedLevel: string = '';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {

  }

  deleteEntry(entryId){
    this.deleteUserQualification(entryId)
  }


}
