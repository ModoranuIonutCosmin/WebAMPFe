import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsPopupComponent } from './playlists-popup.component';

describe('PlaylistsPopupComponent', () => {
  let component: PlaylistsPopupComponent;
  let fixture: ComponentFixture<PlaylistsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
