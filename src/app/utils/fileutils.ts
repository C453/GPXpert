export function downloadGPX(gpx: string, filename: string) {
  const blob = new Blob([gpx], {type: "application/gpx+xml"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.gpx`;
  a.click();
  URL.revokeObjectURL(url);
}
