import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IArtistInfo } from '../models/IArtistInfo';

interface IdToArtistMap {
    [id: string]: string;
}

const getArtistName: IdToArtistMap = { };

/**
 * Stats for a specified country for a given artist
 */
interface IArtistStats {
    countryCode: string;
    streams: number;
}

@Injectable()
export class ArtistsService {

    constructor(private http: HttpClient) { }

    public async getAllArtists(): Promise<IArtistInfo[]> {
        const res = await this.http.get<IdToArtistMap[]>('/api/v1/artists')
            .toPromise();

        const artists: IArtistInfo[] = [];
        for (const k of Object.keys(res)) {
            artists.push({ id: k, name: res[k] });
        }
        return artists;
    }

    // TODO: test
    public async getArtistStats(artistId: string): Promise<IArtistStats[]> {
        return this.http.get<IArtistStats[]>(`/api/v1/artist/${artistId}`)
            .toPromise();
    }
}
