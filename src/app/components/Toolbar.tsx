"use client";

import {Button, Slider} from "@nextui-org/react";

type ToolbarProps = Readonly<{
  onExport: () => void;
  onCropChange: (value: number | number[]) => void;
  numPoints: number;
}>;

export default function Toolbar({
  onExport,
  onCropChange,
  numPoints,
}: ToolbarProps) {
  return (
    <footer
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.5rem",
      }}
    >
      <Slider
        label="Crop"
        hideValue
        step={1}
        minValue={0}
        maxValue={numPoints}
        defaultValue={[0, numPoints]}
        className="flex-grow"
        onChange={onCropChange}
        marks={[
          {
            value: numPoints / 2,
            label: "50%",
          },
        ]}
      />
      <Button onClick={onExport} color="primary">
        Export
      </Button>
    </footer>
  );
}
