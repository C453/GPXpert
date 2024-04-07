import {buildGPX, GarminBuilder} from "gpx-builder";
import {Track} from "gpxparser";
import {LatLngTuple} from "leaflet";
const {Point} = GarminBuilder.MODELS;

export function createGPX(track: LatLngTuple[]) {
  const builder = new GarminBuilder();
  const points = track.map((p) => new Point(p[0], p[1]));
  builder.setSegmentPoints(points);

  return buildGPX(builder.toObject());
}

export function trackPointsToLatLng(track: Track): LatLngTuple[] {
  return track.points.map((p: any) => [p.lat, p.lon]);
}
