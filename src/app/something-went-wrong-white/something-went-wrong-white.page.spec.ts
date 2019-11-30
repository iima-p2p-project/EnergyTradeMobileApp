import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SomethingWentWrongWhitePage } from './something-went-wrong-white.page';

describe('SomethingWentWrongWhitePage', () => {
  let component: SomethingWentWrongWhitePage;
  let fixture: ComponentFixture<SomethingWentWrongWhitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SomethingWentWrongWhitePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SomethingWentWrongWhitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
