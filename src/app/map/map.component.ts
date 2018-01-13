import { Component, OnInit } from '@angular/core';
import 'd3-geomap/d3.geomap.min.js';

declare var d3: any;
declare var colorbrewer: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

constructor() {
}

ngOnInit() {
    const map = d3.geomap.choropleth()
        .geofile('/assets/countries.json')
        .colors(colorbrewer.YlGnBu[9])
        .column('streams')
        .domain([0, 0.11])
        .legend(false)
        .unitId('countryCode');

    d3.csv('/assets/test-data.csv', (error, data) => {
        d3.select('#map')
            .datum(data)
            .call(map.draw, map);
        });
    }
}
