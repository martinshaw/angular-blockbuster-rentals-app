import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersIndexPageComponent } from './customers-index-page.component';

describe('CustomersIndexPageComponent', () => {
  let component: CustomersIndexPageComponent;
  let fixture: ComponentFixture<CustomersIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersIndexPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomersIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
