import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ArtistsService } from './artists.service';


@NgModule({
    declarations: [
        AppComponent,
        MapComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        ArtistsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
