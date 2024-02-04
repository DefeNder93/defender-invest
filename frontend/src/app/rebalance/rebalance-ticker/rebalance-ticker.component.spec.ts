import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RebalanceTickerComponent } from './rebalance-ticker.component';

describe('RebalanceTickerComponent', () => {
  let component: RebalanceTickerComponent;
  let fixture: ComponentFixture<RebalanceTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RebalanceTickerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RebalanceTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
