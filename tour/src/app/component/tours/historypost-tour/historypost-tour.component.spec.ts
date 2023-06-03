import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorypostTourComponent } from './historypost-tour.component';

describe('HistorypostTourComponent', () => {
  let component: HistorypostTourComponent;
  let fixture: ComponentFixture<HistorypostTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorypostTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorypostTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
