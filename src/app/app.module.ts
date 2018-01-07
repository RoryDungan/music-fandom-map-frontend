import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Select2Module } from 'ng2-select2';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';


@NgModule({
    declarations: [
        AppComponent,
        MapComponent
    ],
    imports: [
        BrowserModule,
        Select2Module
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
