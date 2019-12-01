import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidInputModalPage } from './invalid-input-modal.page';

describe('InvalidInputModalPage', () => {
  let component: InvalidInputModalPage;
  let fixture: ComponentFixture<InvalidInputModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidInputModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidInputModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
