import { PrintItemButtonDirective } from './print-item-button.directive';
import { TestBed } from '@angular/core/testing';
import { NgxPrinterService } from './ngx-printer.service';

describe('PrintItemButtonDirective', () => {
  it('should create an instance', () => {
    const service = TestBed.get(NgxPrinterService);
    const directive = new PrintItemButtonDirective(null, service);
    expect(directive).toBeTruthy();
  });
});
