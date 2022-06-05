import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RebalanceCommonParamsComponent } from './rebalance-common-params.component';

describe('RebalanceCommonParamsComponent', () => {
  let component: RebalanceCommonParamsComponent;
  let fixture: ComponentFixture<RebalanceCommonParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RebalanceCommonParamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RebalanceCommonParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
