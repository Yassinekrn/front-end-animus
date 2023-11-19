import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { transform } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

const transformedCoordinates = transform(
  [10.211437112868248, 36.85132364664423],
  'EPSG:4326',
  'EPSG:3857'
);

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
})
export class AboutusComponent implements OnInit {
  map: Map;

  ngOnInit() {
    this.initializeMap();
  }

  initializeMap() {
    // Create a vector source and a feature with the pin coordinates
    const vectorSource = new VectorSource();
    const pinFeature = new Feature({
      geometry: new Point(transformedCoordinates),
    });

    // Create an icon style for the pin
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: '../../../../assets/pin.png', // Replace with the path to your pin icon
      }),
    });

    // Apply the icon style to the pin feature
    pinFeature.setStyle(iconStyle);

    // Add the pin feature to the vector source
    vectorSource.addFeature(pinFeature);

    // Create a vector layer with the vector source
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    // Create the map with layers and view
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer, // Add the vector layer with the pin
      ],
      view: new View({
        center: transformedCoordinates,
        zoom: 18,
      }),
    });
  }
}
