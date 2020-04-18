import { TestBed } from '@angular/core/testing';

import { DRCustomerService } from './drcustomer.service';

describe('DRCustomerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DRCustomerService = TestBed.get(DRCustomerService);
    expect(service).toBeTruthy();
  });
});
