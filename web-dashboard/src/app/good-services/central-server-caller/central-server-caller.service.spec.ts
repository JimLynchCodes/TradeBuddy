import { TestBed } from '@angular/core/testing';

import { ServerCallerService } from './central-server-caller.service';

describe('ServerCallerService', () => {
  let service: ServerCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
});
