import { Component, OnInit, Input } from '@angular/core';
import { IArtistInfo } from '../../models/IArtistInfo';
import { ArtistsService } from '../artists.service';
import { IArtistStats, StreamStats } from '../../models/IArtistStats';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import * as DataMap from 'datamaps/dist/datamaps.world.min';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    private map: DataMap;

    @Input()
    set artist(value: StreamStats) {
        if (!value) {
            return;
        }
        
        this.drawMap(value);
    }

    // RdPu from ColorBrewer
    private fills: {[id: string]: string} = {
        f0: '#FFF7F3',
        f1: '#FDE0DD',
        f2: '#FCC5C0',
        f3: '#FA9FB5',
        f4: '#F768A1',
        f5: '#DD3497',
        f6: '#AE017E',
        f7: '#7A0177',
        f8: '#49006A',
    };

    drawMap(streams: StreamStats) {

        // Turn numbers of streams into colours
        const maxValue = Object.values(streams).reduce(
            (acc, curr) => curr > acc ?  curr : acc,
            0
        );

        const formattedStats = {};
        for (const v in streams) {
            const relativeToMax = streams[v] / maxValue;
            let streamsKey;
            if (relativeToMax < 1 / 9) {
                streamsKey = 'f0';
            } else if (relativeToMax < 2 / 9) {
                streamsKey = 'f1';
            } else if (relativeToMax < 3 / 9) {
                streamsKey = 'f2';
            } else if (relativeToMax < 4 / 9) {
                streamsKey = 'f3';
            } else if (relativeToMax < 5 / 9) {
                streamsKey = 'f4';
            } else if (relativeToMax < 6 / 9) {
                streamsKey = 'f5';
            } else if (relativeToMax < 7 / 9) {
                streamsKey = 'f6';
            } else if (relativeToMax < 8 / 9) {
                streamsKey = 'f7';
            } else {
                streamsKey = 'f8';
            }

            formattedStats[v] = this.fills[streamsKey];
        }

        this.map.updateChoropleth(formattedStats, { reset: true });
    }

    constructor() {
    }

    ngOnInit() {
        // Init map
        this.map = new DataMap({
            element: document.getElementById('map'),
            fills: {
                defaultFill: 'lightgrey'
            }
        });
    }
}
