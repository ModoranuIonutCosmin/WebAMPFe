import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumUploadComponent } from './album-upload.component';

describe('AlbumUploadComponent', () => {
  let component: AlbumUploadComponent;
  let fixture: ComponentFixture<AlbumUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
