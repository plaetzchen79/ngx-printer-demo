import {
  Component,
  OnInit,
  HostBinding,
  Renderer2,
  ElementRef
} from '@angular/core';

/**
 * Component used to render content when printed to current window
 */
@Component({
  selector: 'ngx-printer',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./ngx-printer.component.css']
})
export class NgxPrinterComponent implements OnInit {
  @HostBinding('class')
  private _renderClass = 'default';
  public get renderClass() {
    return this._renderClass;
  }
  public set renderClass(value) {
    this._renderClass = value;
    this.setCustomClass();
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {}

  /**
   * Attach custom class to element
   */
  private setCustomClass() {
    const natElement = this.elementRef.nativeElement;

    this.renderer.removeClass(natElement, 'default');
    this.renderer.addClass(natElement, this._renderClass);
  }
}
