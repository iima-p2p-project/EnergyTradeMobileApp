import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonTradePostSuccessPage } from './non-trade-post-success.page';

describe('NonTradePostSuccessPage', () => {
  let component: NonTradePostSuccessPage;
  let fixture: ComponentFixture<NonTradePostSuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonTradePostSuccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonTradePostSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
