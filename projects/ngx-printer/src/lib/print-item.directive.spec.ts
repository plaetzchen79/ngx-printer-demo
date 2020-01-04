import { PrintItemDirective } from './print-item.directive';
import { TestBed } from '@angular/core/testing';
import { NgxPrinterService } from '../public_api';

describe('PrintItemDirective', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should create an instance PrintItemDirective', () => {
    const service = TestBed.get(NgxPrinterService);
    const directive = new PrintItemDirective(null, service);
    expect(directive).toBeTruthy();
  });

});
