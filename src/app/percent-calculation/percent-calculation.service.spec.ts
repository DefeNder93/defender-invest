import { TestBed } from '@angular/core/testing';

import { PercentCalculationService } from './percent-calculation.service';

describe('PercentCalculationService', () => {
  let service: PercentCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PercentCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
