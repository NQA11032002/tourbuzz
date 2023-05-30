import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPersonalComponent } from './post-personal.component';

describe('PostPersonalComponent', () => {
  let component: PostPersonalComponent;
  let fixture: ComponentFixture<PostPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostPersonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
