import { TestBed } from '@angular/core/testing';

import { GainslockerService } from './gainslocker.service';

describe('GainslockerService', () => {
  let service: GainslockerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GainslockerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
