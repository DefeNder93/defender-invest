import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartParamsComponent } from './chart-params.component';

describe('ChartParamsComponent', () => {
  let component: ChartParamsComponent;
  let fixture: ComponentFixture<ChartParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartParamsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
