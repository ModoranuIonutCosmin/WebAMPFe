import { TestBed } from '@angular/core/testing';

import { ToastrHelpersService } from './toastr-helpers.service';

describe('ToastrHelpersService', () => {
  let service: ToastrHelpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastrHelpersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
