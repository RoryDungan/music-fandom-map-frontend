import { Component, OnInit, Input } from '@angular/core';
import 'd3-geomap/d3.geomap.min.js';
import { IArtistInfo } from '../../models/IArtistInfo';
import { ArtistsService } from '../artists.service';
import { IArtistStats } from '../../models/IArtistStats';

declare var d3: any;
declare var colorbrewer: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    private map: any;

    @Input('artist')
    setArtist(value: IArtistInfo) {
        this.artistsService.getArtistStats(value.id)
            .then(this.drawMap)
            .catch(ex => console.error(ex));
    }

    drawMap(stats: IArtistStats[]) {
        d3.select('#map')
            .datum(stats)
            .call(this.map.draw, this.map);
    }

    constructor(private artistsService: ArtistsService) {
    }

    ngOnInit() {
        // Init map
        this.map = d3.geomap.choropleth()
            .geofile('/assets/countries.json')
            .colors(colorbrewer.YlGnBu[9])
            .column('streams')
            .domain([0, 0.11])
            .legend(false)
            .unitId('countryCode');

        // Draw the empty map
        this.drawMap([]);
    }
}
