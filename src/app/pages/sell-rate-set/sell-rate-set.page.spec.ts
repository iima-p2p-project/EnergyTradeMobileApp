import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellRateSetPage } from './sell-rate-set.page';

describe('SellRateSetPage', () => {
  let component: SellRateSetPage;
  let fixture: ComponentFixture<SellRateSetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellRateSetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellRateSetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
