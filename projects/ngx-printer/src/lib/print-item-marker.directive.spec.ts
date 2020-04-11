import { PrintItemMarkerDirective } from './print-item-marker.directive';
import { NgxPrinterService } from './ngx-printer.service';
import { TestBed } from '@angular/core/testing';

describe('PrintItemMarkerDirective', () => {
  it('should create an instance', () => {
    const service = TestBed.get(NgxPrinterService);
    const directive = new PrintItemMarkerDirective(null, service);
    expect(directive).toBeTruthy();
  });
});
