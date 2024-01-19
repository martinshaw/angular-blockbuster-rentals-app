import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsShowPageComponent } from './rentals-show-page.component';

describe('RentalsShowPageComponent', () => {
  let component: RentalsShowPageComponent;
  let fixture: ComponentFixture<RentalsShowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalsShowPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentalsShowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
