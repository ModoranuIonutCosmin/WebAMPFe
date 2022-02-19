import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistExplorerComponent } from './playlist-explorer.component';

describe('PlaylistExplorerComponent', () => {
  let component: PlaylistExplorerComponent;
  let fixture: ComponentFixture<PlaylistExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistExplorerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
