import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesShowPageComponent } from './movies-show-page.component';

describe('MoviesShowPageComponent', () => {
  let component: MoviesShowPageComponent;
  let fixture: ComponentFixture<MoviesShowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesShowPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesShowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
