import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieGridItemComponent } from './movie-grid-item.component';

describe('MovieGridItemComponent', () => {
  let component: MovieGridItemComponent;
  let fixture: ComponentFixture<MovieGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieGridItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
