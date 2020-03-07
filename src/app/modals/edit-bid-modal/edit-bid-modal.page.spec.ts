import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBidModalPage } from './edit-bid-modal.page';

describe('EditBidModalPage', () => {
  let component: EditBidModalPage;
  let fixture: ComponentFixture<EditBidModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBidModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBidModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
