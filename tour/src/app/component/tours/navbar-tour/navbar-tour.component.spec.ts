import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTourComponent } from './navbar-tour.component';

describe('NavbarTourComponent', () => {
  let component: NavbarTourComponent;
  let fixture: ComponentFixture<NavbarTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
