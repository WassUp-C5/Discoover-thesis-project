import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideListItemComponent } from './guides-list-item.component';

describe('GuideListItemComponent', () => {
  let component: GuideListItemComponent;
  let fixture: ComponentFixture<GuideListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuideListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
