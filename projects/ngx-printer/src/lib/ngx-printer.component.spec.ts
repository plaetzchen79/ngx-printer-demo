import {  ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgxPrinterComponent } from './ngx-printer.component';

describe('NgxPrinterComponent', () => {
  let component: NgxPrinterComponent;
  let fixture: ComponentFixture<NgxPrinterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxPrinterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('NgxPrinterComponent should create', () => {
    expect(component).toBeTruthy();
  });
});
