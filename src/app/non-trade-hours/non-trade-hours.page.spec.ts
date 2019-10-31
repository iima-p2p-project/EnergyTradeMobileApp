import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonTradeHoursPage } from './non-trade-hours.page';

describe('NonTradeHoursPage', () => {
  let component: NonTradeHoursPage;
  let fixture: ComponentFixture<NonTradeHoursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonTradeHoursPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonTradeHoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
