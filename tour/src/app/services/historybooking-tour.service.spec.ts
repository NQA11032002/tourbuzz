import { TestBed } from '@angular/core/testing';

import { HistorybookingTourService } from './historybooking-tour.service';

describe('HistorybookingTourService', () => {
  let service: HistorybookingTourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorybookingTourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
