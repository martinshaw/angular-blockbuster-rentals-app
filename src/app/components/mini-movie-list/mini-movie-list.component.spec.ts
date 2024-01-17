import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniMovieListComponent } from './mini-movie-list.component';

describe('MiniMovieListComponent', () => {
  let component: MiniMovieListComponent;
  let fixture: ComponentFixture<MiniMovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniMovieListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniMovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
