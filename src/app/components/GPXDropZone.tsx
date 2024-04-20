'use client';

import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
import GpxParser from 'gpxparser';

type GPXDropZoneProps = Readonly<{
  onGPXLoad: (track: any) => void;
}>;

export default function GPXDropZone({ onGPXLoad }: GPXDropZoneProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const parser = new GpxParser();
      const reader = new FileReader();

      reader.readAsText(acceptedFiles[0]);
      reader.onload = () => {
        parser.parse(reader.result as string);
        onGPXLoad(parser.tracks[0]);
      };
    },
    [onGPXLoad]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'text/plain': ['.gpx'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex justify-center items-center h-[calc(100dvh)] w-full bg-gray-100 flex-col"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drop some files here, or click to select files</p>
      )}
    </div>
  );
}
