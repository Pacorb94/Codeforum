import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsFinderComponent } from './topics-finder.component';

describe('TopicsFinderComponent', () => {
  let component: TopicsFinderComponent;
  let fixture: ComponentFixture<TopicsFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicsFinderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
