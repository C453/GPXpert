"use client";

import {MapContainer, Polyline, TileLayer, useMap} from "react-leaflet";
import type {LatLngTuple} from "leaflet";

import "leaflet/dist/leaflet";
import {useEffect} from "react";

type MapProps = Readonly<{
  positions: LatLngTuple[];
}>;

export default function Map({positions}: MapProps) {
  return (
    <MapContainer
      center={positions[0]}
      zoom={15}
      scrollWheelZoom={true}
      style={{flexGrow: 1}}
    >
      <TileLayer url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png" />
      <Polyline
        pathOptions={{fillColor: "red", color: "blue"}}
        positions={positions}
      />
    </MapContainer>
  );
}
