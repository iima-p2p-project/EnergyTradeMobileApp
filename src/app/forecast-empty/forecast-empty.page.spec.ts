import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastEmptyPage } from './forecast-empty.page';

describe('ForecastEmptyPage', () => {
  let component: ForecastEmptyPage;
  let fixture: ComponentFixture<ForecastEmptyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastEmptyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastEmptyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
