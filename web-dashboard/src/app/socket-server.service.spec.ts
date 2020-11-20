import { TestBed } from '@angular/core/testing';

import { SocketServerService } from './socket-server.service';

describe('SocketServerService', () => {
  let service: SocketServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
