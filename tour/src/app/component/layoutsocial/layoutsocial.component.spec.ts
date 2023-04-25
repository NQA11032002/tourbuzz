import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutsocialComponent } from './layoutsocial.component';

describe('LayoutsocialComponent', () => {
  let component: LayoutsocialComponent;
  let fixture: ComponentFixture<LayoutsocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutsocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutsocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
