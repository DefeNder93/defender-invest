import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RebalanceResultsComponent } from './rebalance-results.component';

describe('RebalanceResultsComponent', () => {
  let component: RebalanceResultsComponent;
  let fixture: ComponentFixture<RebalanceResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RebalanceResultsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RebalanceResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
