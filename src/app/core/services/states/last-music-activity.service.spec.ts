import { TestBed } from '@angular/core/testing';

import { MusicActivityService } from './music-activity.service';

describe('LastMusicActivityService', () => {
  let service: MusicActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
