import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SelectModule } from 'ng2-select';

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
        SelectModule,
        HttpClientModule
    ],
    providers: [
        ArtistsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
