import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentCalculationComponent } from './percent-calculation.component';

describe('PercentCalculationComponent', () => {
  let component: PercentCalculationComponent;
  let fixture: ComponentFixture<PercentCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercentCalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
