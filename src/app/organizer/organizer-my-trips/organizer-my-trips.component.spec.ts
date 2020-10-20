import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerMyTripsComponent } from './organizer-my-trips.component';

describe('OrganizerMyTripsComponent', () => {
  let component: OrganizerMyTripsComponent;
  let fixture: ComponentFixture<OrganizerMyTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerMyTripsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerMyTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
