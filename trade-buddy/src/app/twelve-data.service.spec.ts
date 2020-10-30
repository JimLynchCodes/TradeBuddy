import { TestBed } from '@angular/core/testing';

import { TwelveDataService } from './twelve-data.service';

describe('TwelveDataService', () => {
  let service: TwelveDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwelveDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
