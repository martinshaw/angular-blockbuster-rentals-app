import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalCreationSidebarComponent } from './rental-creation-sidebar.component';

describe('RentalCreationSidebarComponent', () => {
  let component: RentalCreationSidebarComponent;
  let fixture: ComponentFixture<RentalCreationSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalCreationSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentalCreationSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
