import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmptyPage } from './dashboard-empty.page';

describe('DashboardEmptyPage', () => {
  let component: DashboardEmptyPage;
  let fixture: ComponentFixture<DashboardEmptyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardEmptyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEmptyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
