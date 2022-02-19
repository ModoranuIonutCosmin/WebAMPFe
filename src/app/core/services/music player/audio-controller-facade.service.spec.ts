import { TestBed } from '@angular/core/testing';

import { MusicPlayerControllerFacadeService } from './music-player-controller-facade.service';

describe('AudioControllerFacadeService', () => {
  let service: MusicPlayerControllerFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicPlayerControllerFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
