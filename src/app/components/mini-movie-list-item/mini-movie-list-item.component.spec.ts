import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniMovieListItemComponent } from './mini-movie-list-item.component';

describe('MiniMovieListItemComponent', () => {
  let component: MiniMovieListItemComponent;
  let fixture: ComponentFixture<MiniMovieListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniMovieListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniMovieListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
