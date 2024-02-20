import { useGridStore } from "@/store";

type HighlightOverlayProps = {
  cellWidth: number;
  cellHeight: number;
};

const HighlightOverlay = ({ cellWidth, cellHeight }: HighlightOverlayProps) => {
  const highlightedStart = useGridStore((state) => state.highlightedStart);
  const highlightedEnd = useGridStore((state) => state.highlightedEnd);

  if (
    highlightedStart.row === undefined ||
    highlightedStart.column === undefined ||
    highlightedEnd.row === undefined ||
    highlightedEnd.column === undefined
  ) {
    return null;
  }

  const top = Math.min(highlightedStart.row, highlightedEnd.row) * cellHeight;
  const left =
    Math.min(highlightedStart.column, highlightedEnd.column) * cellWidth;
  const width =
    (Math.abs(highlightedEnd.column - highlightedStart.column) + 1) * cellWidth;
  const height =
    (Math.abs(highlightedEnd.row - highlightedStart.row) + 1) * cellHeight;

  return (
    <div
      className="absolute bg-blue-300 bg-opacity-50"
      style={{
        top: `${top}px`,
        left: `${left + 32}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  );
};

export default HighlightOverlay;
