import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { Select2Component } from 'ng2-select2';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [
            AppComponent,
            MapComponent,
            Select2Component
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
