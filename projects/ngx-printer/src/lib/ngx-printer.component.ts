import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  Output,
  EventEmitter
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

  private _renderClass = 'default';
  public get renderClass() {
    return this._renderClass;
  }
  public set renderClass(value) {
    this._renderClass = value;
    this.setCustomClass();
  }

  /**
   * Display single image
   */
  private _imgSrc = 'default';
  public get imgSrc() {
    return this._imgSrc;
  }
  public set imgSrc(value) {
    this._imgSrc = value;
    this.addImage(this._imgSrc);
  }

  @Output() completed = new EventEmitter<boolean>();

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

  /**
   * Add custom image
   * @param source 
   */
  private addImage(source: string) {
    const natElement = this.elementRef.nativeElement;

    const newImgElement = this.renderer.createElement('img');
    this.renderer.setAttribute(newImgElement, 'src', source);

    this.renderer.listen(newImgElement, 'load', (evt) => {
      console.log('loading completed', evt);
      this.completed.emit(true);
    });

    this.renderer.appendChild(natElement, newImgElement);
  }
}
