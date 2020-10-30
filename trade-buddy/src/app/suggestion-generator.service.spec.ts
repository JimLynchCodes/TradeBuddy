import { TestBed } from '@angular/core/testing';

import { SuggestionGeneratorService } from './suggestion-generator.service';

describe('SuggestionGeneratorService', () => {
  let service: SuggestionGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuggestionGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
