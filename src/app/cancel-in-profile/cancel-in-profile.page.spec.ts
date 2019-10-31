import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelInProfilePage } from './cancel-in-profile.page';

describe('CancelInProfilePage', () => {
  let component: CancelInProfilePage;
  let fixture: ComponentFixture<CancelInProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelInProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelInProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
