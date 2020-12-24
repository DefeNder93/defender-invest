import { TestBed } from '@angular/core/testing';

import { RebalanceService } from './rebalance.service';

describe('RebalanceService', () => {
  let service: RebalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RebalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
