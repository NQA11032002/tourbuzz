import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutmanagertourComponent } from './layoutmanagertour.component';

describe('LayoutmanagertourComponent', () => {
  let component: LayoutmanagertourComponent;
  let fixture: ComponentFixture<LayoutmanagertourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutmanagertourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutmanagertourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
