import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionInfoComponent } from './discussion-info.component';

describe('DiscussionInfoComponent', () => {
  let component: DiscussionInfoComponent;
  let fixture: ComponentFixture<DiscussionInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscussionInfoComponent]
    });
    fixture = TestBed.createComponent(DiscussionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
