"use client";

import GPXDropZone from "@/app/components/GPXDropZone";

import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import {useCallback, useState} from "react";

import type {Track} from "gpxparser";
import type {LatLngTuple} from "leaflet";
import Toolbar from "@/app/components/Toolbar";
import {createGPX, trackPointsToLatLng} from "@/app/utils/gpx";
import {downloadGPX} from "@/app/utils/fileutils";

const Map = dynamic(() => import("./components/Map"), {ssr: false});

export default function Home() {
  const [gpxTrack, setGPXTrack] = useState<Track | null>(null);
  const [positions, setPositions] = useState<LatLngTuple[] | null>(null);
  const [originalPositions, setOriginalPositions] = useState<
    LatLngTuple[] | null
  >(null);

  const onGPXLoad = useCallback((track: Track) => {
    const points = trackPointsToLatLng(track);

    setGPXTrack(track);
    setPositions(points);
    setOriginalPositions(points);
  }, []);

  const onExport = useCallback(() => {
    if (!positions) {
      return;
    }
    const exportedGPX = createGPX(positions);
    downloadGPX(exportedGPX, gpxTrack?.name || "exported");
  }, [positions, gpxTrack]);

  const onCropChange = useCallback(
    (value: number | number[]) => {
      if (!originalPositions || typeof value === "number") {
        return;
      }
      setPositions(originalPositions?.slice(value[0], value[1]));
    },
    [originalPositions]
  );

  return (
    <main className="flex min-h-screen flex-col">
      {originalPositions && positions ? (
        <>
          <Map positions={positions} />
          <Toolbar
            numPoints={originalPositions.length}
            onExport={onExport}
            onCropChange={onCropChange}
          />
        </>
      ) : (
        <GPXDropZone onGPXLoad={onGPXLoad} />
      )}
    </main>
  );
}
