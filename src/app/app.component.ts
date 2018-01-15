import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { ArtistsService } from './artists.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Music Fandom Map';

    artistsData: Select2OptionData[] = [];

    constructor(private artistsService: ArtistsService) { }

    ngOnInit(): void {
        this.getArtists();
    }

    getArtists(): void {
        this.artistsService.getAllArtists()
            .then(artists =>
                this.artistsData = artists.map(a => <Select2OptionData>{
                    id: a.id,
                    text: a.name
                })
            )
            .catch(ex => console.error(ex));
    }
}
