import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelOrderModal2Page } from './cancel-order-modal2.page';

describe('CancelOrderModal2Page', () => {
  let component: CancelOrderModal2Page;
  let fixture: ComponentFixture<CancelOrderModal2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelOrderModal2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelOrderModal2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
