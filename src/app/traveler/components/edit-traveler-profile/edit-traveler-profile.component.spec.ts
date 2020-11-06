import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTravelerProfileComponent } from './edit-traveler-profile.component';

describe('EditTravelerProfileComponent', () => {
  let component: EditTravelerProfileComponent;
  let fixture: ComponentFixture<EditTravelerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTravelerProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTravelerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
