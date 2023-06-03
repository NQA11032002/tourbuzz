import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayouttourComponent } from './layouttour.component';

describe('LayouttourComponent', () => {
  let component: LayouttourComponent;
  let fixture: ComponentFixture<LayouttourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayouttourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayouttourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
