import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportFieldsComponent } from './sport-fields.component';

describe('SportFieldsComponent', () => {
  let component: SportFieldsComponent;
  let fixture: ComponentFixture<SportFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
