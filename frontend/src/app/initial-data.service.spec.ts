import { TestBed } from '@angular/core/testing';

import { InitialDataService } from './initial-data.service';

describe('InitialDataService', () => {
  let service: InitialDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
