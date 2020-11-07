import { Component, OnInit, Input } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';


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
  // @Input() type;

  entryLanguage: string = '';
  entrySelectedLevel: string = '';
  currentUser = this.tokenStorage.getUser()

  constructor(
    private tokenStorage: TokenStorageService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {

  }

  deleteEntry(entryId){
    this.usersService.deleteUserQualification(this.currentUser.id, entryId)
    .subscribe((result) => {
      console.log('after delete language', result);
      // this.getGuide();
    });
  }


}
