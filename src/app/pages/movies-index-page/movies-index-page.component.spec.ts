import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesIndexPageComponent } from './movies-index-page.component';

describe('MoviesIndexPageComponent', () => {
  let component: MoviesIndexPageComponent;
  let fixture: ComponentFixture<MoviesIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesIndexPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
