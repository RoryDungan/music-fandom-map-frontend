import { TestBed, inject } from '@angular/core/testing';

import { ArtistsService } from './artists.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { testArtists } from '../models/testData';
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

    it('gets correct route when all artists are requested', () => {
        spyOn(http, 'get').and.returnValue(Observable.of(testArtists));
        service.getAllArtists();
        expect(http.get).toHaveBeenCalledWith('/api/v1/artists');
    });

    it('returns data from API', async () => {
        const testData = {
            'id1': 'Artist 1',
            'id2': 'Artist 2'
        };

        const expected: IArtistInfo[] = [
            { id: 'id1', name: 'Artist 1' },
            { id: 'id2', name: 'Artist 2' }
        ];

        spyOn(http, 'get').and.returnValue(Observable.of(testData));
        const actual = await service.getAllArtists();

        expect(actual).toEqual(expected);
    });
});
