import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorybookingTourComponent } from './historybooking-tour.component';

describe('HistorybookingTourComponent', () => {
  let component: HistorybookingTourComponent;
  let fixture: ComponentFixture<HistorybookingTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorybookingTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorybookingTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
