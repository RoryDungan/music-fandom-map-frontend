import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IArtistInfo } from '../models/IArtistInfo';
import { IArtistStats } from '../models/IArtistStats';

interface IdToArtistMap {
    [id: string]: string;
}

const getArtistName: IdToArtistMap = { };

@Injectable()
export class ArtistsService {

    constructor(private http: HttpClient) { }

    public async getAllArtists(): Promise<IArtistInfo[]> {
        const url = '/api/v1/artists';
        const res = await this.http.get<IdToArtistMap[]>(url)
            .toPromise();

        const artists: IArtistInfo[] = [];
        for (const k of Object.keys(res)) {
            artists.push({ id: k, name: res[k] });
        }
        return artists.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1;
            } else if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    }

    // TODO: test
    public async getArtistStats(artistId: string): Promise<IArtistStats> {
        return this.http.get<IArtistStats>(`/api/v1/artist/${artistId}`)
            .toPromise();
    }
}
