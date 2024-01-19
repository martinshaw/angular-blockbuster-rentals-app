import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsIndexPageComponent } from './rentals-index-page.component';

describe('RentalsIndexPageComponent', () => {
  let component: RentalsIndexPageComponent;
  let fixture: ComponentFixture<RentalsIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalsIndexPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentalsIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
