import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseUserTypePage } from './choose-user-type.page';

describe('ChooseUserTypePage', () => {
  let component: ChooseUserTypePage;
  let fixture: ComponentFixture<ChooseUserTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseUserTypePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseUserTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
