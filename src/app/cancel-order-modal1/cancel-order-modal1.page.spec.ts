import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelOrderModal1Page } from './cancel-order-modal1.page';

describe('CancelOrderModal1Page', () => {
  let component: CancelOrderModal1Page;
  let fixture: ComponentFixture<CancelOrderModal1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelOrderModal1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelOrderModal1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
