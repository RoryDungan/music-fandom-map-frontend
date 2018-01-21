import { Component, OnInit } from '@angular/core';
import { ArtistsService } from './artists.service';

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

    selectedId?: string;

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
}
