import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumTopicsListComponent } from './forum-topics-list.component';

describe('ForumTopicsListComponent', () => {
  let component: ForumTopicsListComponent;
  let fixture: ComponentFixture<ForumTopicsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumTopicsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumTopicsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
