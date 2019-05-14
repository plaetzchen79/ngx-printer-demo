# NgxPrinterDemo

A simple service to print the window or parts of a window (div).
Printing of Angular Templates or Components is possible.

# Usage
1. Add to main *app.module* imports
2. Use the *NgxPrinterService* where you like via DI (private printerService: NgxPrinterService)
3. Use the the functions provided by the service

## Options
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

## Functions
### Print current window
`this.printerService.printCurrentWindow();`

### Print div by id
`this.printerService.printDiv('idOfDivToPrint');`

### Print Angular TemplateRef or Component
```javascript
 @ViewChild('PrintTemplate')
  private PrintTemplateTpl: TemplateRef<any>;

printTemplate() {
    this.printerService.printAngular(this.PrintTemplateTpl);
  }
```

## Event of print window
If you want to check whether the print window is open or not subscribe to obserbable
*$printWindowOpen*

```javascript
this.printWindowSunscription = this.printerService.$printWindowOpen.subscribe(val => {
      console.log('Print window is open:', val);
});
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
