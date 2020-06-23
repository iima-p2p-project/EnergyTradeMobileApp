import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEventsPage } from './all-events.page';

describe('AllEventsPage', () => {
  let component: AllEventsPage;
  let fixture: ComponentFixture<AllEventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEventsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
