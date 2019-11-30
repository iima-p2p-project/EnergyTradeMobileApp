import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrdersEmptyPage } from './manage-orders-empty.page';

describe('ManageOrdersEmptyPage', () => {
  let component: ManageOrdersEmptyPage;
  let fixture: ComponentFixture<ManageOrdersEmptyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageOrdersEmptyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOrdersEmptyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
