import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumFilterOptionsComponent } from './album-filter-options.component';

describe('AlbumFilterOptionsComponent', () => {
  let component: AlbumFilterOptionsComponent;
  let fixture: ComponentFixture<AlbumFilterOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumFilterOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumFilterOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
