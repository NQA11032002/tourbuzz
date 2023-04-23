import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTourComponent } from './post-tour.component';

describe('PostTourComponent', () => {
  let component: PostTourComponent;
  let fixture: ComponentFixture<PostTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
