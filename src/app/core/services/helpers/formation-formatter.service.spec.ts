import { TestBed } from '@angular/core/testing';

import { DurationFormatterService } from './duration-formatter.service';

describe('FormationFormatterService', () => {
  let service: DurationFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DurationFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
