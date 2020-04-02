import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDrEventSetsPage } from './all-dr-event-sets.page';

describe('AllDrEventSetsPage', () => {
  let component: AllDrEventSetsPage;
  let fixture: ComponentFixture<AllDrEventSetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDrEventSetsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDrEventSetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
