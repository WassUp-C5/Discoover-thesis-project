import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidePropsalasListComponent } from './guide-propsalas-list.component';

describe('GuidePropsalasListComponent', () => {
  let component: GuidePropsalasListComponent;
  let fixture: ComponentFixture<GuidePropsalasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuidePropsalasListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidePropsalasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
