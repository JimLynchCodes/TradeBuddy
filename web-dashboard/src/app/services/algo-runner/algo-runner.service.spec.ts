import { TestBed } from '@angular/core/testing';

import { AlgoRunnerService } from './algo-runner.service';

describe('AlgoRunnerService', () => {
  let service: AlgoRunnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgoRunnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
