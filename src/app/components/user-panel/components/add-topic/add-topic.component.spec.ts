import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopicsComponent } from './add-topic.component';

describe('AddTopicsComponent', () => {
  let component: AddTopicsComponent;
  let fixture: ComponentFixture<AddTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTopicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
