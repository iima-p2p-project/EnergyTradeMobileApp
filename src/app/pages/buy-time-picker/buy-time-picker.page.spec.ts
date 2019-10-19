import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTimePickerPage } from './buy-time-picker.page';

describe('BuyTimePickerPage', () => {
  let component: BuyTimePickerPage;
  let fixture: ComponentFixture<BuyTimePickerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyTimePickerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyTimePickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
