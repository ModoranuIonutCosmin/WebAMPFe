import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourPlaylistsComponent } from './your-playlists.component';

describe('YourPlaylistsComponent', () => {
  let component: YourPlaylistsComponent;
  let fixture: ComponentFixture<YourPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourPlaylistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
