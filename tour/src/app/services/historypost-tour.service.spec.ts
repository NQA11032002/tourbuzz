import { TestBed } from '@angular/core/testing';

import { HistorypostTourService } from './historypost-tour.service';

describe('HistorypostTourService', () => {
  let service: HistorypostTourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorypostTourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
