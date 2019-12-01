import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonTradeHoursAlertPage } from './non-trade-hours-alert.page';

describe('NonTradeHoursAlertPage', () => {
  let component: NonTradeHoursAlertPage;
  let fixture: ComponentFixture<NonTradeHoursAlertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonTradeHoursAlertPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonTradeHoursAlertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
