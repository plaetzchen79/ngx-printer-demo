import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgxPrinterService } from './ngx-printer.service';
import { ngxPrintMarkerPosition } from './ngx-print-marker-position.enum';


/**
 * Mark an div as printable and provide direct print function
 */
@Directive({
  selector: '[ngxPrintItemMarker]',
})
export class PrintItemMarkerDirective implements OnInit {
  @Input()
  customClass = '';

  @Input()
  directPrint = false;

  @Input()
  imgPosition = ngxPrintMarkerPosition.Topleft;

  /**
   * Data for an svg image used as background url
   * @example
   * backgroundImage = 'data:image/svg+xml;base64,PD9....'
   *
   */
  @Input()
  backgroundImage =
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTAgNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGQ9Ik0zOS4zODcsMjEuNDcxSDMyLjI5VjExLjE5OWMwLTAuNTUzLTAuNDQ3LTEtMS0xSDE3LjQ4NGMtMC41NTMsMC0xLDAuNDQ3LTEsMXYxMC4yNzFIOS4zODdjLTAuNTUzLDAtMSwwLjQ0Ny0xLDFWMzUuNDUNCgljMCwwLjU1MywwLjQ0NywxLDEsMWg2Ljg5NHYzLjU2NWMwLDAuNTUzLDAuNDQ3LDEsMSwxaDEzLjgwNmMwLjU1MywwLDEtMC40NDcsMS0xVjM2LjQ1aDcuMzAxYzAuNTUzLDAsMS0wLjQ0NywxLTFWMjIuNDcxDQoJQzQwLjM4NywyMS45MTgsMzkuOTM5LDIxLjQ3MSwzOS4zODcsMjEuNDcxeiBNMTguNDg0LDEyLjE5OUgzMC4yOXY5LjI3MUgxOC40ODRWMTIuMTk5eiBNMzAuMDg2LDM5LjAxNkgxOC4yOHYtNi4zMjloMTEuODA2VjM5LjAxNg0KCXogTTM4LjM4NywzNC40NWgtNi4zMDF2LTIuNzY0YzAtMC41NTMtMC40NDctMS0xLTFIMTcuMjhjLTAuNTUzLDAtMSwwLjQ0Ny0xLDF2Mi43NjRoLTUuODk0VjIzLjQ3MWg2Ljg5NA0KCWMwLjA2OCwwLjAxNCwwLjEzMSwwLjA0MSwwLjIwMywwLjA0MUgzMS4yOWMwLjA3MiwwLDAuMTM2LTAuMDI3LDAuMjAzLTAuMDQxaDYuODkzVjM0LjQ1eiIvPg0KPC9zdmc+DQo=';

  imgMainStyles = {
    'background-color': '#c3c3b6',
    height: '16px',
    width: '16px',
    position: 'absolute',
    cursor: 'pointer'
  };

  imgPositionTopLeft = {
    left: '1px',
    top: '1px',
  };

  imgPositionTopRight = {
    right: '1px',
    top: '1px',
  };

  imgPositionBottomLeft = {
    left: '1px',
    bottom: '1px',
  };

  imgPositionBottomRight = {
    right: '1px',
    bottom: '1px',
  };

  /**
   * Event fired when marker clicked
   * @emits
   */
  @Output()
  printClicked = new EventEmitter<any>();

  constructor(
    private el: ElementRef,
    private renderer2: Renderer2,
    private printerService: NgxPrinterService
  ) {}

  ngOnInit() {
    const newIndicator = document.createElement('div');
    this.imgPosition = this.printerService.markerPosition;

    this.addIndicatorDiv(this.el, newIndicator);

    newIndicator.addEventListener('click', () => {
      if (this.directPrint) {
        const elementToPrint = this.el.nativeElement.getElementsByClassName(
          'print_indicator'
        );

        if (elementToPrint && elementToPrint.length > 0) {
          this.renderer2.setStyle(elementToPrint[0], 'visibility', 'hidden');
          this.printerService.printHTMLElement(this.el.nativeElement);
          this.renderer2.setStyle(elementToPrint[0], 'visibility', 'visible');
        } else {
          console.log('element with indicator class not found..');
        }
      }
      this.printClicked.emit(true);
    });
  }

  /**
   * Change and add div with Indicator
   * @param el
   * @param newIndicator
   */
  private addIndicatorDiv(el: ElementRef<any>, newIndicator: HTMLDivElement) {
    const natElement = el.nativeElement;
    this.renderer2.addClass(newIndicator, 'print_indicator');
    this.renderer2.setStyle(natElement, 'position', 'relative');
    this.renderer2.appendChild(el.nativeElement, newIndicator);
    if (this.customClass === '') {
      this.setCss(newIndicator);
    } else {
      this.renderer2.addClass(newIndicator, this.customClass);
    }
  }

  /**
   * Set the default css properties
   * @param newIndicator
   */
  private setCss(newIndicator: HTMLDivElement) {
    Object.keys(this.imgMainStyles).forEach((element) => {
      newIndicator.style.setProperty(`${element}`, this.imgMainStyles[element]);
    });

    this.setPosition(newIndicator);

    const imgUrl = 'url(' + this.backgroundImage + ')';
    newIndicator.style.setProperty(`background-image`, imgUrl);
  }

  /**
   * Set image position
   * @internal
   * @param newIndicator
   */
  private setPosition(newIndicator: HTMLDivElement) {
    switch (this.imgPosition) {
      case ngxPrintMarkerPosition.Topleft: {
        Object.keys(this.imgPositionTopLeft).forEach((element) => {
          newIndicator.style.setProperty(
            `${element}`,
            this.imgPositionTopLeft[element]
          );
        });
        break;
      }
      case ngxPrintMarkerPosition.TopRight: {
        Object.keys(this.imgPositionTopRight).forEach((element) => {
          newIndicator.style.setProperty(
            `${element}`,
            this.imgPositionTopRight[element]
          );
        });
        break;
      }
      case ngxPrintMarkerPosition.BottomLeft: {
        Object.keys(this.imgPositionBottomLeft).forEach((element) => {
          newIndicator.style.setProperty(
            `${element}`,
            this.imgPositionBottomLeft[element]
          );
        });
        break;
      }
      case ngxPrintMarkerPosition.BottomRight: {
        Object.keys(this.imgPositionBottomRight).forEach((element) => {
          newIndicator.style.setProperty(
            `${element}`,
            this.imgPositionBottomRight[element]
          );
        });
        break;
      }
      default: {
        Object.keys(this.imgPositionTopLeft).forEach((element) => {
          newIndicator.style.setProperty(
            `${element}`,
            this.imgPositionTopLeft[element]
          );
        });
        break;
      }
    }
  }
}
