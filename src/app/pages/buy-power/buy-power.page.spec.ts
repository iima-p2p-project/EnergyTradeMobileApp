import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPowerPage } from './buy-power.page';

describe('BuyPowerPage', () => {
  let component: BuyPowerPage;
  let fixture: ComponentFixture<BuyPowerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyPowerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyPowerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
