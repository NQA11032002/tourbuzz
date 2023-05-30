import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutInforComponent } from './about-infor.component';

describe('AboutInforComponent', () => {
  let component: AboutInforComponent;
  let fixture: ComponentFixture<AboutInforComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutInforComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
