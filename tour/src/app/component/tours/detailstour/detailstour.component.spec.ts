import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailstourComponent } from './detailstour.component';

describe('DetailstourComponent', () => {
  let component: DetailstourComponent;
  let fixture: ComponentFixture<DetailstourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailstourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailstourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
