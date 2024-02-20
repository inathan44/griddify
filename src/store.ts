import { create } from "zustand";
import { Row, Cell } from "../types";
import { produce } from "immer";

const INITIAL_ROWS = 50;
const INITIAL_COLUMNS = 20;

type GridStore = {
  rowHeaders: Cell[];
  colHeaders: Cell[];
  grid: Row[];
  editCellValue: (
    row: number,
    column: number,
    value: string | number | undefined,
  ) => void;
  focusedCell: { row: number | undefined; column: number | undefined };
  setFocusedCell: (row: number | undefined, column: number | undefined) => void;
  currentlyHighlighting: boolean;
  setCurrentHighlighting: (value: boolean) => void;
  highlightedRange: {
    start: { row: number | undefined; column: number | undefined };
    end: { row: number | undefined; column: number | undefined };
  };
  setHighlightedRange: (
    start: { row: number | undefined; column: number | undefined },
    end: { row: number | undefined; column: number | undefined },
  ) => void;
};

export const useGridStore = create<GridStore>((set) => ({
  rowHeaders: Array.from({ length: INITIAL_ROWS }).map((_row, i) =>
    createCell(i, 1),
  ),
  colHeaders: Array.from({ length: INITIAL_COLUMNS }).map((_row, i) =>
    createCell(0, i),
  ),
  grid: Array.from({ length: INITIAL_ROWS }).map((_row, i) =>
    createRow(i, INITIAL_COLUMNS),
  ),
  editCellValue: (row, column, value) => {
    set(
      produce((state) => {
        state.grid[row].cells[column].value = value;
      }),
    );
  },
  focusedCell: { row: 0, column: 0 },
  setFocusedCell: (row, column) => {
    if (row === undefined || column === undefined) {
      row = undefined;
      column = undefined;
      set({ focusedCell: { row, column } });
      return;
    }
    set({ focusedCell: { row, column } });
  },

  // Highlighting, dragging functionality
  currentlyHighlighting: false,
  setCurrentHighlighting: (value) => {
    set({ currentlyHighlighting: value });
  },
  highlightedRange: {
    start: { row: 0, column: 0 },
    end: { row: 0, column: 0 },
  },
  setHighlightedRange: (start, end) => {
    if (start === undefined || end === undefined) {
      set({
        highlightedRange: {
          start: { row: undefined, column: undefined },
          end: { row: undefined, column: undefined },
        },
      });
    }
    set({
      highlightedRange: {
        start,
        end,
      },
    });
  },
}));

function createCell(row: number, column: number): Cell {
  return {
    row,
    column,
    value: "",
    style: {
      textColor: "black",
      backgroundColor: "white",
      fontFamily: "Arial",
      fontSize: 12,
      bold: false,
      italic: false,
      underline: false,
      decimals: 0,
    },
  };
}

function createRow(row: number, columns: number): Row {
  const cells = [];
  for (let i = 0; i < columns; i++) {
    cells.push(createCell(row, i));
  }

  return { cells, row: row };
}
