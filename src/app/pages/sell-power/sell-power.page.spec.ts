import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPowerPage } from './sell-power.page';

describe('SellPowerPage', () => {
  let component: SellPowerPage;
  let fixture: ComponentFixture<SellPowerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellPowerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellPowerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
