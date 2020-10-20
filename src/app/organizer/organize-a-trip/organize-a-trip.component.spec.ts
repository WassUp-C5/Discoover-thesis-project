import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizeATripComponent } from './organize-a-trip.component';

describe('OrganizeATripComponent', () => {
  let component: OrganizeATripComponent;
  let fixture: ComponentFixture<OrganizeATripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizeATripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizeATripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
