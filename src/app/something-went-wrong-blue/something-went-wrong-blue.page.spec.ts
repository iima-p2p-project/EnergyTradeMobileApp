import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SomethingWentWrongBluePage } from './something-went-wrong-blue.page';

describe('SomethingWentWrongBluePage', () => {
  let component: SomethingWentWrongBluePage;
  let fixture: ComponentFixture<SomethingWentWrongBluePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SomethingWentWrongBluePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SomethingWentWrongBluePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
