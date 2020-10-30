import { TestBed } from '@angular/core/testing';

import { ToastManagerService } from './toast-manager.service';

describe('ToastManagerService', () => {
  let service: ToastManagerService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
