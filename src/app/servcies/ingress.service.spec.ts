import { TestBed } from '@angular/core/testing';

import { IngressService } from './ingress.service';

describe('IngressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngressService = TestBed.get(IngressService);
    expect(service).toBeTruthy();
  });
});
