import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginapiComponent } from './loginapi.component';

describe('LoginapiComponent', () => {
  let component: LoginapiComponent;
  let fixture: ComponentFixture<LoginapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginapiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
