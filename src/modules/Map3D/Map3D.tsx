/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/** TODO: Fix the a11y problems, by forexample converting the terminal marker to a button */

import React, { useRef, useCallback } from "react";
import ReactMapGL, { useMap, Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { connect } from "react-redux";
import { Button } from "@blueprintjs/core";

import "./Map3D.scss";
import * as Actions from "state/actions";
import { Viewport } from "types";

// The property is for example documented here https://docs.mapbox.com/mapbox-gl-js/api/properties/#workerclass
(mapboxgl as any).workerClass =
  // The following imports Mapbox but prevents webpack from transpiling it to avoid a ES5->ES6
  // eslint-disable-next-line import/no-webpack-loader-syntax, @typescript-eslint/no-var-requires
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const Map3D: React.FC<any> = (props) => {
  const mapRef = useRef<any>(null);
  const { mainMap } = useMap();

  const onMapLoad = useCallback(() => {
    const map = mapRef.current.getMap();
    map.addSource("mapbox-dem", {
      type: "raster-dem",
      url: "mapbox://mapbox.mapbox-terrain-dem-v1",
      tileSize: 512,
      maxzoom: 14,
    });
    map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
  }, []);

  return (
    <div className="map-container">
      <ReactMapGL
        {...props.viewport}
        id="mainMap"
        width="100%"
        height="100%"
        onMove={(event: any) => {
          props.setViewport(event.viewState);
        }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken=""
        onLoad={onMapLoad}
        attributionControl
        ref={mapRef}
      >
        <Marker
          key="test"
          longitude={-120.33449459999999}
          latitude={36.9120248}
        >
          <Button
            icon="selection"
            minimal
            onClick={() => {
              mainMap?.flyTo({
                center: [-120.33449459999999, 36.9120248],
                zoom: 17,
                pitch: 70,
                bearing: 0,
              });
            }}
          />
        </Marker>
      </ReactMapGL>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  viewport: state.user.data.ApplicationSettings.viewport,
});

const mapDispatchToProps = (dispatch: any) => ({
  setViewport: (viewport: Viewport) => dispatch(Actions.setViewport(viewport)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map3D);
