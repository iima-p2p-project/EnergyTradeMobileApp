import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventModalPage } from './edit-event-modal.page';

describe('EditEventModalPage', () => {
  let component: EditEventModalPage;
  let fixture: ComponentFixture<EditEventModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEventModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
