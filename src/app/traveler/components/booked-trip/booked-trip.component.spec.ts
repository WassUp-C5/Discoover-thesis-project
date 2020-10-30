import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedTripComponent } from './booked-trip.component';

describe('BookedTripComponent', () => {
  let component: BookedTripComponent;
  let fixture: ComponentFixture<BookedTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedTripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
