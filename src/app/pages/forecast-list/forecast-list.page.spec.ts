import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastListPage } from './forecast-list.page';

describe('ForecastListPage', () => {
  let component: ForecastListPage;
  let fixture: ComponentFixture<ForecastListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
