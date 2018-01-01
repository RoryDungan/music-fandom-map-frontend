import { Component, OnInit } from '@angular/core';
import 'd3-geomap/d3.geomap.min.js'

declare var d3: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {

    let map = d3.geomap()
      .geofile('/assets/countries.json');
    
    d3.select('#map')
      .call(map.draw, map);
  }

}
