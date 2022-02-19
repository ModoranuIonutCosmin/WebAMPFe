import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumInfoPanelComponent } from './album-info-panel.component';

describe('AlbumInfoPanelComponent', () => {
  let component: AlbumInfoPanelComponent;
  let fixture: ComponentFixture<AlbumInfoPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumInfoPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
