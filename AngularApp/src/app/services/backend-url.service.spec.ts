import { TestBed } from '@angular/core/testing';

import { BackendURLService } from './backend-url.service';

describe('BackendURLService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackendURLService = TestBed.get(BackendURLService);
    expect(service).toBeTruthy();
  });
});
