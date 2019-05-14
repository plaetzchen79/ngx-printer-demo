import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {  NgxPrinterModule } from 'projects/ngx-printer/src/public_api';
import { LittleDummyComponent } from './little-dummy/little-dummy.component';

@NgModule({
  declarations: [
    AppComponent,
    LittleDummyComponent
  ],
  imports: [
    BrowserModule,
    NgxPrinterModule.forRoot({printOpenWindow: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
