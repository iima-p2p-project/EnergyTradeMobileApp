import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSellLeadsPage } from './total-sell-leads.page';

describe('TotalSellLeadsPage', () => {
  let component: TotalSellLeadsPage;
  let fixture: ComponentFixture<TotalSellLeadsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalSellLeadsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalSellLeadsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
