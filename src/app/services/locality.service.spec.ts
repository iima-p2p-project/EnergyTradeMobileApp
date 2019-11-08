import { TestBed } from '@angular/core/testing';

import { LocalityService } from './locality.service';

describe('LocalityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalityService = TestBed.get(LocalityService);
    expect(service).toBeTruthy();
  });
});
