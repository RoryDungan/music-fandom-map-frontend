import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ArtistsService } from './artists.service';
import { AppModule } from './app.module';
import { Observable } from 'rxjs/Observable';
import { testArtists } from '../models/testData';
import { HttpClient } from '@angular/common/http';
import { SelectComponent } from 'ng2-select';

class HttpClientStub {
    public get(url: string): Observable<{[id: string]: string}> {
        return Observable.of(testArtists);
    }
}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                ArtistsService,
                { provide: HttpClient, useClass: HttpClientStub }
            ],
            declarations: [
                AppComponent,
                MapComponent
            ],
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it(`should have as title 'Music Fandom Map'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Music Fandom Map');
    }));
    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Welcome to Music Fandom Map!');
    }));
});
