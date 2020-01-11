import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementPage } from './statement.page';

describe('StatementPage', () => {
  let component: StatementPage;
  let fixture: ComponentFixture<StatementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
