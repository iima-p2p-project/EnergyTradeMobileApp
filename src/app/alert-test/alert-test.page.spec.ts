import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertTestPage } from './alert-test.page';

describe('AlertTestPage', () => {
  let component: AlertTestPage;
  let fixture: ComponentFixture<AlertTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertTestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
