import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmReservationButtonComponent } from './confirm-reservation-button.component';

describe('ConfirmReservationButtonComponent', () => {
  let component: ConfirmReservationButtonComponent;
  let fixture: ComponentFixture<ConfirmReservationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmReservationButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmReservationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
