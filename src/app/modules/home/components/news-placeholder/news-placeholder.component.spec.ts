import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPlaceholderComponent } from './news-placeholder.component';

describe('NewsPlaceholderComponent', () => {
  let component: NewsPlaceholderComponent;
  let fixture: ComponentFixture<NewsPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsPlaceholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
