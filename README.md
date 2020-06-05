# NgxPrinterDemo

A easy to use service to print the window, parts of a window (div) or an image.
Printing of Angular Templates or Components is possible.

You can print opening a new window / tab or using the current window.
A directive can also be used to mark and store an HTML-element.

Several usefull directives can further assist you.

See the DEMO App and [DEMO-Page](https://plaetzchen79.github.io/) for examples.


# Usage
1. Add to main *app.module* imports
2. Use the *NgxPrinterService* where you like via DI (private printerService: NgxPrinterService)
3. Use the the functions provided by the service

**Easy start**

The easiest way to print an HTML Element is 
HTML:
```html
<div ngxPrintItemMarker directPrint="true"></div>
```

## Options
### Open new window
The service prints by opening a new window.
There is an option *printWindowOpen* to change this behavoir.
Set printWindowOpen=false;

You can also set this option in .forRoot while importing the
module to the *app.module*

```javascript
    imports: [
    BrowserModule,
    NgxPrinterModule.forRoot({printOpenWindow: true})
  ],
```
### Rendering time
Before openening the print window the service to some time to render the print content.
Default time is 200ms.
You can adjust the time using the property *timeToWaitRender* (also in forRoot).

### Default CSS-Class
When printing to the current window the service creates an component with a
css-class called 'default'.
You can override this class name using the property *renderClass* (also in forRoot).
Make sure that the class is placed in your global styles (styles.css).

### Name of app-root
When printing to the current window the service searches the app-root component. If you have changed the name of the root component in your app you can override the name using the property *appRootName*.

### Position of image for directive 'ngxPrintItemMarker'
The maker image is placed to the bottom left. You can change this by changing the
property *markerPosition*. Use a value of the enum  *ngxPrintMarkerPosition* (TopLeft, .TopRight, .BottomLeft, .BottomRight).

### Print preview - not fire print event
If want to display a preview without fireing the print event you can use *printPreviewOnly = true*. This can also be usefull for debugging purposes.

## Functions - How to print 
### Print current window
`this.printerService.printCurrentWindow();`

### Print div by id
`this.printerService.printDiv('idOfDivToPrint');`

### Print image src/url directly
`this.printerService.printImg('assets/bratwurst.jpg');`

### Print Angular TemplateRef or Component
```javascript
 @ViewChild('PrintTemplate')
  private PrintTemplateTpl: TemplateRef<any>;

printTemplate() {
    this.printerService.printAngular(this.PrintTemplateTpl);
  }
```
Beware: To print a component the component needs to be known by service (copy source and add it to entry
component of app.module).
Otherwise use printHTMLElement instead.

### Print HTML Element
```javascript
 @ViewChild(LittleDummyComponent, {read: ElementRef}) PrintComponent: ElementRef;

 printHTMLElementToCurrent() {
    this.printerService.printHTMLElement(this.PrintComponent.nativeElement);
  }
```

## Event of print window
If you want to check whether the print window is open or not subscribe to observable
*$printWindowOpen*

```javascript
this.printWindowSubscription = this.printerService.$printWindowOpen.subscribe(val => {
      console.log('Print window is open:', val);
});
```

## Directive ngxPrintItem
 There is an directive ngxPrintItem to mark and store an HTML-Element as an item which can be printed 
 later and anyhwere on the page.
 An id has to be set.
 These items are stored in the services observable *printerService.$printItems*.

 ### function 'printPrintItem'
 Use the async pipe to subscribe and then call the function `printPrintItem`  to print **one** item.

 HTML:
```html
<span id="firstPrintItem" ngxPrintItem printName="First one" >A <b>first</b> span with an ngxPrintItem directive</span>

<div *ngFor="let prinItem of $printItems | async">
  <span>{{prinItem.id}} - {{prinItem.printName}}</span>
  <button (click)="printItem(prinItem)">Print me!</button>
</div>
```
TS:
```javascript
  printItem(itemToPrint: PrintItem) {
    this.printerService.printPrintItem(itemToPrint);
  }
});
```

### function 'printPrintItems'
You can also use the function `printPrintItems(itemsToPrint, ?customCssClass)` to print more than one item.
The items will be printed beneath each other (simple flex css). To arrange them side by side you can set your custom
class as a second parameter.

TS:
```javascript
  this.$printItems.subscribe(items => {
      itemsToPrint = items as PrintItem[];
    });

    this.printerService.printPrintItems(itemsToPrint);
```

## Directive ngxPrintItemButton
If you want to print a single item from the list of ngxPrintItems (see above) or other HTML-elements without ts you can use the diretive ngxPrintItemButton. 
You can use
- an id of the printItem from the list
- a class name (className="ABC") of an HTML element
- an id of an HTML element (divID = "") of an HTML element
- an property to print the whole window (printWindow="true")

The Click-Event to print the item will be automatically set.

HTML:
```html
<button ngxPrintItemButton printItemId="firstPrintItem">Print first item directly</button>
<button ngxPrintItemButton className="printident">
  Print item by className with this button
</button>
<button ngxPrintItemButton divID="printDiv">
  Print div by id with this button
</button>
<button ngxPrintItemButton printWindow="true"> Print whole window with this button </button>
```

## Directive ngxPrintItemMarker
If you want to indicate an item as printable you can use this directive.
The default class adds a little printer symbol to the top left of the html element.

### Show marker/icon
Just display marker.

HTML:
```html
<div ngxPrintItemMarker>
```

### Print after marker click
If you click the little printer print starts immediately.

HTML:
```html
<div ngxPrintItemMarker directPrint="true"></div>
```

### Customization
You can override the default class with the `customClass` property.
Make sure that the css class is globally accessable e.g. put it into "styles.css".
You can also only override the image using the property `backgroundImage`. You can
speficy the data for the *background-url*.

### Event 
You can listen to the event 'printClicked'.

HTML:
```html
<div id="printDivMarker" ngxPrintItemMarker (printClicked)="printerMarkerClicked()">

<div id="printDivMarker" ngxPrintItemMarker customClass="mymarker" >
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


# Buy me a coffee
..if you like this lib ;-)

<a href="https://www.buymeacoffee.com/plaetzchen79" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-blue.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>
