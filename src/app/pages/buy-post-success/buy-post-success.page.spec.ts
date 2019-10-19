import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPostSuccessPage } from './buy-post-success.page';

describe('BuyPostSuccessPage', () => {
  let component: BuyPostSuccessPage;
  let fixture: ComponentFixture<BuyPostSuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyPostSuccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyPostSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
