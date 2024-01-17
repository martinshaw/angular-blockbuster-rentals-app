import { TestBed } from '@angular/core/testing';

import { RentalCreationSidebarFormService } from './rental-creation-sidebar-form.service';

describe('RentalCreationSidebarFormService', () => {
  let service: RentalCreationSidebarFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalCreationSidebarFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
