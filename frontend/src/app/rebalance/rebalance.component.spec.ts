import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RebalanceComponent } from './rebalance.component';

describe('RebalanceComponent', () => {
  let component: RebalanceComponent;
  let fixture: ComponentFixture<RebalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RebalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RebalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
