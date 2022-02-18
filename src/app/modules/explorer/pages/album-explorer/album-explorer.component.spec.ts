import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumExplorerComponent } from './album-explorer.component';

describe('AlbumExplorerComponent', () => {
  let component: AlbumExplorerComponent;
  let fixture: ComponentFixture<AlbumExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumExplorerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
