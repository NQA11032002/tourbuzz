import { TestBed } from '@angular/core/testing';

import { ChangeinforService } from './changeinfor.service';

describe('ChangeinforService', () => {
  let service: ChangeinforService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeinforService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
