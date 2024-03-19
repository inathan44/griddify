import { memo, useEffect, useRef } from "react";
import type { Cell } from "../../types";
import { useGridStore } from "../store/grid";
import { cn } from "@/lib/utils";

type cellProps = {
  cell: Cell;
  isFocused: boolean;
};

const Cell = memo(({ cell, isFocused }: cellProps) => {
  // console.log(`Cell: ${cell.row}, ${cell.column} is being rendered`);

  const inputRef = useRef<HTMLInputElement>(null);

  const editCellValue = useGridStore((state) => state.editCellValue);
  const calculateFormula = useGridStore((state) => state.calculateFormula);
  const setFocusedCell = useGridStore((state) => state.setFocusedCell);
  const setHighlightedStart = useGridStore(
    (state) => state.setHighlightedStart,
  );
  const setHighlightedEnd = useGridStore((state) => state.setHighlightedEnd);
  const setCurrentlyHighlighting = useGridStore(
    (state) => state.setCurrentlyHighlighting,
  );
  const clearHighlightedRange = useGridStore(
    (state) => state.clearHighlightedRange,
  );
  const clearStyling = useGridStore((state) => state.clearStyling);

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [isFocused]);

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    column: number,
  ) {
    // Handle navigation keys
    if (e.key === "Tab") {
      e.preventDefault();
    }
    if (
      ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Tab"].includes(e.key)
    ) {
      setHighlightedStart({ row: undefined, column: undefined });
      setHighlightedEnd({ row: undefined, column: undefined });
    }
    if (e.key === "Enter" || e.key === "ArrowDown") {
      setFocusedCell(row + 1, column);
    } else if (e.key === "ArrowUp") {
      setFocusedCell(row - 1, column);
    } else if (e.key === "ArrowRight" || e.key === "Tab") {
      setFocusedCell(row, column + 1);
    } else if (e.key === "ArrowLeft") {
      setFocusedCell(row, column - 1);
    }

    // handle delete key
    if (e.key === "Delete") {
      clearHighlightedRange();
      clearStyling();
    }
  }

  const mouseIsDown = useRef(false);

  useEffect(() => {
    const handleMouseDown = () => {
      mouseIsDown.current = true;
    };

    const handleMouseUp = () => {
      mouseIsDown.current = false;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      className={cn("h-8 w-24 border-[0.5px] border-gray-700", {
        "border-2 border-blue-700": isFocused,
      })}
      style={{ backgroundColor: cell.style.backgroundColor }}
      onMouseDown={() => {
        setCurrentlyHighlighting(true);
        setHighlightedStart({ row: cell.row, column: cell.column });
        setHighlightedEnd({ row: cell.row, column: cell.column });
      }}
      onMouseUp={() => {
        setCurrentlyHighlighting(false);
        setHighlightedEnd({ row: cell.row, column: cell.column });
      }}
      onMouseEnter={() => {
        if (mouseIsDown.current) {
          setHighlightedEnd({ row: cell.row, column: cell.column });
        }
      }}
    >
      <input
        ref={inputRef}
        value={cell.computedValue}
        onChange={(e) => editCellValue(cell.row, cell.column, e.target.value)}
        onBlur={(e) => calculateFormula(cell.row, cell.column, e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, cell.row, cell.column)}
        type="text"
        className={cn(
          "relative z-30 h-full w-full bg-transparent p-1 focus:outline-none",
          {
            "font-bold": cell.style.bold,
          },
          { "text-underline": cell.style.underline },
        )}
        onMouseDown={() => setFocusedCell(cell.row, cell.column)}
        style={{
          color: cell.style.textColor,
          fontSize: `${cell.style.fontSize}px`,
          backgroundColor: isFocused
            ? cell.style.backgroundColor
            : "transparent",
          textDecoration: cell.style.underline ? "underline" : "none",
        }}
      />
    </div>
  );
});

export default Cell;
