import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-printer',
  template: `
      <ng-content></ng-content>
  `,
  styleUrls: ['./ngx-printer.component.css']
})
export class NgxPrinterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
