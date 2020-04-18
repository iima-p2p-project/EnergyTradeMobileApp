import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDRAssetPage } from './add-drasset.page';

describe('AddDRAssetPage', () => {
  let component: AddDRAssetPage;
  let fixture: ComponentFixture<AddDRAssetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDRAssetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDRAssetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
