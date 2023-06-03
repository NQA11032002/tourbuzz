import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortinfoComponent } from './shortinfo.component';

describe('ShortinfoComponent', () => {
  let component: ShortinfoComponent;
  let fixture: ComponentFixture<ShortinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
