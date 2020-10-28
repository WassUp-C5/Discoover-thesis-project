import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailsVistorComponent } from './trip-details-vistor.component';

describe('TripDetailsVistorComponent', () => {
  let component: TripDetailsVistorComponent;
  let fixture: ComponentFixture<TripDetailsVistorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDetailsVistorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDetailsVistorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
