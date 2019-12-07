import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndDateModalPage } from './end-date-modal.page';

describe('EndDateModalPage', () => {
  let component: EndDateModalPage;
  let fixture: ComponentFixture<EndDateModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndDateModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndDateModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
