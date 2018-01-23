import { TestBed, inject } from '@angular/core/testing';

import { ArtistsService } from './artists.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { testArtists, testStatsFuture } from '../models/testData';
import { IArtistInfo } from '../models/IArtistInfo';

class HttpClientStub {
    public get(url: string): Observable<{[id: string]: string}> {
        return Observable.of(testArtists);
    }
}

describe('ArtistsService', () => {
    let service: ArtistsService;
    let http: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ArtistsService,
                { provide: HttpClient, useClass: HttpClientStub }
            ]
        });

        service = TestBed.get(ArtistsService);
        http = TestBed.get(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('gets correct route when all artists are requested', async () => {
        spyOn(http, 'get').and.returnValue(Observable.of(testArtists));
        await service.getAllArtists();
        expect(http.get).toHaveBeenCalledWith('/api/v1/artists');
    });

    it('sorts list of artists returned from API', async () => {
        const testData = {
            'id1': 'Madvillain',
            'id2': 'M.F. DOOM',
            'id3': 'madlib',
        };

        const expected: IArtistInfo[] = [
            { id: 'id2', name: 'M.F. DOOM' },
            { id: 'id3', name: 'madlib' },
            { id: 'id1', name: 'Madvillain' }
        ];

        spyOn(http, 'get').and.returnValue(Observable.of(testData));
        const actual = await service.getAllArtists();

        expect(actual).toEqual(expected);
    });

    it('gets correct route to request stats for a specified artist', async () => {
        spyOn(http, 'get').and.returnValue(Observable.of(testStatsFuture));
        await service.getArtistStats('5a51a895db7f6c1fee0001dc');
        expect(http.get).toHaveBeenCalledWith('/api/v1/artist/5a51a895db7f6c1fee0001dc');
    });

    it('returns artist stats', async () => {
        spyOn(http, 'get').and.returnValue(Observable.of(testStatsFuture));
        const actual = await service.getArtistStats('5a51a895db7f6c1fee0001dc');

        expect(actual).toEqual(testStatsFuture);
    });
});
