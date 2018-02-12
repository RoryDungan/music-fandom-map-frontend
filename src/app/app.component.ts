import { Component, OnInit } from '@angular/core';
import { ArtistsService } from './artists.service';
import { IArtistInfo } from '../models/IArtistInfo';
import { IArtistStats, StreamStats } from '../models/IArtistStats';

interface SelectItem {
    id: string;
    text: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Music Fandom Map';

    artistsData: SelectItem[] = [];

    selectedArtist?: IArtistInfo;

    selectedArtistDetails?: IArtistStats;

    constructor(private artistsService: ArtistsService) { }

    ngOnInit(): void {
        this.getArtists();
    }

    getArtists(): void {
        this.artistsService.getAllArtists()
            .then(artists =>
                this.artistsData = artists.map(a => ({
                    id: a.id,
                    text: a.name
                }) as SelectItem)
            )
            .catch(ex => console.error(ex));
    }

    public artistSelected(value: SelectItem) {
        this.selectedArtist = { id: value.id, name: value.text };
        this.artistsService.getArtistStats(value.id)
            .then(a => this.selectedArtistDetails = a)
            .catch(ex => console.error(ex));
    }

    public currentArtistImage(): string | undefined {
        if (this.selectedArtistDetails) {
            return this.selectedArtistDetails.imageUrl;
        }
        return undefined;
    }

    public currentArtistDescription(): string | undefined {
        if (this.selectedArtistDetails) {
            return this.selectedArtistDetails.description;
        }
        return undefined;
    }

    public currentArtistStats(): StreamStats | undefined {
        if (this.selectedArtistDetails) {
            return this.selectedArtistDetails.streams;
        }
        return undefined;
    }
}
