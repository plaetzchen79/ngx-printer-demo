import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPrinterComponent } from './ngx-printer.component';

describe('NgxPrinterComponent', () => {
  let component: NgxPrinterComponent;
  let fixture: ComponentFixture<NgxPrinterComponent>;

  beforeEach(async(() => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
