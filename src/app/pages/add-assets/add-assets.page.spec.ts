import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetsPage } from './add-assets.page';

describe('AddAssetsPage', () => {
  let component: AddAssetsPage;
  let fixture: ComponentFixture<AddAssetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssetsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
