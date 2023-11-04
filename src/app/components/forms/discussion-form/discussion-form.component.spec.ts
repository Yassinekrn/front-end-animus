import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionFormComponent } from './discussion-form.component';

describe('DiscussionFormComponent', () => {
  let component: DiscussionFormComponent;
  let fixture: ComponentFixture<DiscussionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscussionFormComponent]
    });
    fixture = TestBed.createComponent(DiscussionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
