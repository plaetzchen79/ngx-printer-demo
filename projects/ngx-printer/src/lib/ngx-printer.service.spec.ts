import { TestBed } from '@angular/core/testing';

import { NgxPrinterService } from './ngx-printer.service';

describe('NgxPrinterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxPrinterService = TestBed.get(NgxPrinterService);
    expect(service).toBeTruthy();
  });
});
