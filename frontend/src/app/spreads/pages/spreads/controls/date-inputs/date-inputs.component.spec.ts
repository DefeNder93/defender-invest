import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateInputsComponent } from './date-inputs.component';

describe('DateInputsComponent', () => {
  let component: DateInputsComponent;
  let fixture: ComponentFixture<DateInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateInputsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
