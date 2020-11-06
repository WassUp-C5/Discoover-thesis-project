import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGuideProfileComponent } from './edit-guide-profile.component';

describe('EditGuideProfileComponent', () => {
  let component: EditGuideProfileComponent;
  let fixture: ComponentFixture<EditGuideProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGuideProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGuideProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
