import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'little-dummy',
  templateUrl: './little-dummy.component.html',
  styleUrls: ['./little-dummy.component.css']
})
export class LittleDummyComponent implements OnInit {

  @Input() helloText = '';

  constructor() { }

  ngOnInit() {
  }

}
