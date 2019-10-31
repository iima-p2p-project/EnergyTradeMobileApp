import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelNonTradeHourPage } from './cancel-non-trade-hour.page';

describe('CancelNonTradeHourPage', () => {
  let component: CancelNonTradeHourPage;
  let fixture: ComponentFixture<CancelNonTradeHourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelNonTradeHourPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelNonTradeHourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
