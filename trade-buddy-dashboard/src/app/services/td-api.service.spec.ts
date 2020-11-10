import { TestBed } from '@angular/core/testing';

import { TdApiService } from './td-api.service';

describe('TdApiService', () => {
  let service: TdApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TdApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
