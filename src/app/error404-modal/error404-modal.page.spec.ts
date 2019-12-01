import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Error404ModalPage } from './error404-modal.page';

describe('Error404ModalPage', () => {
  let component: Error404ModalPage;
  let fixture: ComponentFixture<Error404ModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Error404ModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Error404ModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
