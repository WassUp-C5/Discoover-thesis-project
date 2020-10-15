import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideNavBarComponent } from './guide-navbar.component';

describe('GuideNavBarComponent', () => {
  let component: GuideNavBarComponent;
  let fixture: ComponentFixture<GuideNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuideNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
