import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseChartComponent } from './close-chart.component';

describe('CloseChartComponent', () => {
  let component: CloseChartComponent;
  let fixture: ComponentFixture<CloseChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
