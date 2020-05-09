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
 Use the async pipe to subscribe and the function `printPrintItem`  to print the item.

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

## Directive ngxPrintItemButton
If you want to print a single item from the list of ngxPrintItems (see above) without ts you can use the diretive ngxPrintItemButton. You have to know the id of the printItem.
The Click-Event to print the item will be automatically set.

```html
<button ngxPrintItemButton printItemId="firstPrintItem">Print first item directly</button>
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

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


# Buy me a coffee
..if you like this lib ;-)

<style>.bmc-button img{height: 34px !important;width: 35px !important;margin-bottom: 1px !important;box-shadow: none !important;border: none !important;vertical-align: middle !important;}.bmc-button{padding: 7px 10px 7px 10px !important;line-height: 35px !important;height:51px !important;min-width:217px !important;text-decoration: none !important;display:inline-flex !important;color:#ffffff !important;background-color:#5F7FFF !important;border-radius: 5px !important;border: 1px solid transparent !important;padding: 7px 10px 7px 10px !important;font-size: 22px !important;letter-spacing: 0.6px !important;box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;margin: 0 auto !important;font-family:'Cookie', cursive !important;-webkit-box-sizing: border-box !important;box-sizing: border-box !important;-o-transition: 0.3s all linear !important;-webkit-transition: 0.3s all linear !important;-moz-transition: 0.3s all linear !important;-ms-transition: 0.3s all linear !important;transition: 0.3s all linear !important;}.bmc-button:hover, .bmc-button:active, .bmc-button:focus {-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;text-decoration: none !important;box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;opacity: 0.85 !important;color:#ffffff !important;}</style><link href="https://fonts.googleapis.com/css?family=Cookie" rel="stylesheet"><a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/plaetzchen79"><img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:15px;font-size:28px !important;">Buy me a coffee</span></a>