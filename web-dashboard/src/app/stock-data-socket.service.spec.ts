import { TestBed } from '@angular/core/testing';

import { StockDataSocketService } from './stock-data-socket.service';

describe('StockDataSocketService', () => {
  let service: StockDataSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockDataSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
