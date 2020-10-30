import { TestBed } from '@angular/core/testing';

import { TripleGainersDataService } from './triple-gainers-data.service';

describe('TripleGainersDataService', () => {
  let service: TripleGainersDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripleGainersDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
