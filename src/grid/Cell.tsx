import { useEffect, useRef } from "react";
import type { Cell } from "../../types";
import { useGridStore } from "../store";
import { isCellHighlighted } from "@/lib/helperFunctions";
import { cn } from "@/lib/utils";

type cellProps = {
  cell: Cell;
};

const Cell = ({ cell }: cellProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const editCellValue = useGridStore((state) => state.editCellValue);
  const setFocusedCell = useGridStore((state) => state.setFocusedCell);
  const highlightedRange = useGridStore((state) => state.highlightedRange);
  const focusedCell = useGridStore((state) => state.focusedCell);
  const currentlyHighlighting = useGridStore(
    (state) => state.currentlyHighlighting,
  );

  const setCurrentHighlighting = useGridStore(
    (state) => state.setCurrentHighlighting,
  );

  const setHighlightedRange = useGridStore(
    (state) => state.setHighlightedRange,
  );

  useEffect(() => {
    if (focusedCell.row === cell.row && focusedCell.column === cell.column) {
      inputRef.current?.focus();
    }
  }, [focusedCell.row, focusedCell.column, cell.row, cell.column]);

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    column: number,
  ) {
    // Handle navigation keys
    if (
      ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Tab"].includes(e.key)
    ) {
      setHighlightedRange(
        { row: undefined, column: undefined },
        { row: undefined, column: undefined },
      );
    }
    if (e.key === "Enter" || e.key === "ArrowDown") {
      setFocusedCell(row + 1, column);
    } else if (e.key === "ArrowUp") {
      setFocusedCell(row - 1, column);
    } else if (e.key === "ArrowRight") {
      setFocusedCell(row, column + 1);
    } else if (e.key === "ArrowLeft") {
      setFocusedCell(row, column - 1);
    }

    // handle escape key
    if (e.key === "Delete") {
      if (
        highlightedRange.start.row !== undefined &&
        highlightedRange.start.column !== undefined &&
        highlightedRange.end.row !== undefined &&
        highlightedRange.end.column !== undefined
      ) {
        for (
          let i = highlightedRange.start.row;
          i <= highlightedRange.end.row;
          i++
        ) {
          for (
            let j = highlightedRange.start.column;
            j <= highlightedRange.end.column;
            j++
          ) {
            editCellValue(i, j, "");
          }
        }
      }
      editCellValue(row, column, "");
    }
  }

  const cellHighlighted = isCellHighlighted(
    cell.row,
    cell.column,
    {
      row: highlightedRange.start.row,
      column: highlightedRange.start.column,
    },
    {
      row: highlightedRange.end.row,
      column: highlightedRange.end.column,
    },
  );

  return (
    <div
      className={cn(
        "h-8 w-24 border-[0.5px] border-gray-700  focus-within:border-2 focus-within:border-blue-600",
        {
          "bg-blue-100": cellHighlighted,
        },
        {
          "border-b border-blue-700":
            cell.row === highlightedRange.end.row && cellHighlighted,
        },
        {
          "border-r border-blue-700":
            cell.column === highlightedRange.end.column && cellHighlighted,
        },
        {
          "border-t border-blue-700":
            cell.row === highlightedRange.start.row && cellHighlighted,
        },
        {
          "border-l border-blue-700":
            cell.column === highlightedRange.start.column && cellHighlighted,
        },
      )}
      onMouseDown={() => {
        setCurrentHighlighting(true);
        setHighlightedRange(
          { row: cell.row, column: cell.column },
          { row: cell.row, column: cell.column },
        );
      }}
      onMouseUp={() => {
        setCurrentHighlighting(false);
        setHighlightedRange(
          {
            row: highlightedRange.start.row,
            column: highlightedRange.start.column,
          },
          { row: cell.row, column: cell.column },
        );
      }}
      onMouseEnter={() => {
        if (currentlyHighlighting) {
          setHighlightedRange(
            {
              row: highlightedRange.start.row,
              column: highlightedRange.start.column,
            },
            { row: cell.row, column: cell.column },
          );
        }
      }}
    >
      <input
        ref={inputRef}
        value={cell.value}
        onChange={(e) => editCellValue(cell.row, cell.column, e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, cell.row, cell.column)}
        type="text"
        className="h-full w-full bg-transparent p-1 focus:outline-none"
        onMouseDown={() => setFocusedCell(cell.row, cell.column)}
      />
    </div>
  );
};

export default Cell;
