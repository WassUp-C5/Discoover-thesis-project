import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideATripComponent } from './guide-a-trip.component';

describe('GuideATripComponent', () => {
  let component: GuideATripComponent;
  let fixture: ComponentFixture<GuideATripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuideATripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideATripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
