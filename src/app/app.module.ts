import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SelectModule } from 'ng2-select';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ArtistsService } from './artists.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        MapComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        SelectModule,
        HttpClientModule
    ],
    providers: [
        ArtistsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
