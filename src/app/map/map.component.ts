import { Component, OnInit, Input } from '@angular/core';
import { IArtistInfo } from '../../models/IArtistInfo';
import { ArtistsService } from '../artists.service';
import { IArtistStats } from '../../models/IArtistStats';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import * as DataMap from 'datamaps/dist/datamaps.world.min';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    private map: any;

    @Input()
    set artist(value: IArtistInfo) {
        if (!value) {
            return;
        }

        this.artistsService.getArtistStats(value.id)
            .then(s => this.drawMap(s))
            .catch(ex => console.error(ex));
    }

    drawMap(stats: IArtistStats[]) {
        // Workaround - the map only expects strings even though the values are
        // numbers
        const formattedStats = stats
            .map(v => ({ countryCode: v.countryCode, streams: `${v.streams}` }));

        // d3.select('#map')
        //     .datum(formattedStats)
        //     .call(this.map.draw, this.map);
    }

    constructor(private artistsService: ArtistsService) {
    }

    ngOnInit() {
        // Init map
        // this.map = d3.geomap.choropleth()
        //     .geofile('/assets/countries.json')
        //     .colors(colorbrewer.YlGnBu[9])
        //     .column('streams')
        //     .domain([0, 0.11])
        //     .legend(false)
        //     .unitId('countryCode');
        const map = new DataMap({
            element: document.getElementById('map'),
        });

        // // Draw the empty map
        // this.drawMap([]);
    }
}
