import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePumpsModalPage } from './delete-pumps-modal.page';

describe('DeletePumpsModalPage', () => {
  let component: DeletePumpsModalPage;
  let fixture: ComponentFixture<DeletePumpsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePumpsModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePumpsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
