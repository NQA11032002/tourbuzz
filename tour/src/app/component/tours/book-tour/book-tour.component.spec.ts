import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTourComponent } from './book-tour.component';

describe('BookTourComponent', () => {
  let component: BookTourComponent;
  let fixture: ComponentFixture<BookTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
