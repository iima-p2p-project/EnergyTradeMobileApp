import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellTimePickerPage } from './sell-time-picker.page';

describe('SellTimePickerPage', () => {
  let component: SellTimePickerPage;
  let fixture: ComponentFixture<SellTimePickerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellTimePickerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellTimePickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
