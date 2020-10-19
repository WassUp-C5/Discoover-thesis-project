import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerNavbarComponent } from './organizer-navbar.component';

describe('OrganizerNavbarComponent', () => {
  let component: OrganizerNavbarComponent;
  let fixture: ComponentFixture<OrganizerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
