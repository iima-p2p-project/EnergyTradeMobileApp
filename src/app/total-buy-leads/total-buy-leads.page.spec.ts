import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalBuyLeadsPage } from './total-buy-leads.page';

describe('TotalBuyLeadsPage', () => {
  let component: TotalBuyLeadsPage;
  let fixture: ComponentFixture<TotalBuyLeadsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalBuyLeadsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalBuyLeadsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
