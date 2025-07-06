import { TestBed } from '@angular/core/testing';

import { NgxPrinterService } from './ngx-printer.service';
import { PrintServiceConfig, PrintItem } from '../public_api';

describe('NgxPrinterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  let service: NgxPrinterService;
  const serviceConfig = new PrintServiceConfig();

  serviceConfig.timeToWaitRender = 20;
  serviceConfig.printOpenWindow = false;

  createTestDivs();

  beforeEach(() => {
    service = TestBed.inject(NgxPrinterService);
    service.timeToWaitRender = serviceConfig.timeToWaitRender;
    expect(service).toBeTruthy();
  });
  
  it('NgxPrinterService should be created', () => {
    service = TestBed.inject(NgxPrinterService);
    service.timeToWaitRender = serviceConfig.timeToWaitRender;
    expect(service).toBeTruthy();
  });


  it('should add print item', done => {
    const printItem = new PrintItem();
    printItem.id = '1';
    const elem = <HTMLDivElement>document.createElement('div');
    printItem.nativeElement = elem;
    printItem.printDisplayName = 'Test';
    service.addPrintItem(printItem);

    const subcriptionAdd = service.$printItems.subscribe(data => {
      expect(data.length).toBe(1);
      done();
    });
    subcriptionAdd.unsubscribe();
  });

  it('should remove print item', done => {
    service.removePrintItem('1');

    service.$printItems.subscribe(data => {
      expect(data).toEqual([]);
      done();
    });
  });

  it('should print item', done => {
    service.printDiv('Div1');

    setTimeout(() => {
      console.log('expect print');
      expect(document.querySelector('ngx-printer')).toEqual(null);
    }, service.timeToWaitRender + 10);

    setTimeout(() => {
      const subcriptionAdd = service.$printWindowOpen.subscribe(data => {
        console.log(data);
        expect(data).toBe(false);
        done();
      });
      subcriptionAdd.unsubscribe();
    }, 25);
  });
});

function createTestDivs() {
  const newElem = <HTMLDivElement>document.createElement('div');
  newElem.id = 'Div1';
  newElem.innerHTML = 'Test Div 1';
  const newElem2 = <HTMLDivElement>document.createElement('div');
  newElem2.id = 'Div2';
  newElem2.innerHTML = 'Test Div 2';
  document.body.appendChild(newElem);
  document.body.appendChild(newElem2);
}
