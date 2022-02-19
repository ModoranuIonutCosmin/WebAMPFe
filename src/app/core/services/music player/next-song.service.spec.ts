import { TestBed } from '@angular/core/testing';

import { NextSongService } from './next-song.service';

describe('NextSongService', () => {
  let service: NextSongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NextSongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
