import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersShowPageComponent } from './customers-show-page.component';

describe('CustomersShowPageComponent', () => {
  let component: CustomersShowPageComponent;
  let fixture: ComponentFixture<CustomersShowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersShowPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomersShowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
