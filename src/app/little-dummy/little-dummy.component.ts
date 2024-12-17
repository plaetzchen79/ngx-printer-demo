import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'little-dummy',
    templateUrl: './little-dummy.component.html',
    styleUrls: ['./little-dummy.component.css'],
    standalone: false
})
export class LittleDummyComponent implements OnInit {

  @Input() helloText = '';

  constructor() { }

  ngOnInit() {
  }

}
