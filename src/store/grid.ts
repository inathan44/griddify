import { create } from "zustand";
import type { Row, Cell, Style } from "../../types";
import { produce } from "immer";

const INITIAL_ROWS = 20;
const INITIAL_COLUMNS = 26;

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
  setCurrentlyHighlighting: (value: boolean) => void;
  highlightedStart: { row: number | undefined; column: number | undefined };
  highlightedEnd: { row: number | undefined; column: number | undefined };
  setHighlightedStart: (start: {
    row: number | undefined;
    column: number | undefined;
  }) => void;
  setHighlightedEnd: (end: {
    row: number | undefined;
    column: number | undefined;
  }) => void;
  clearHighlightedRange: () => void;
  applyStyleToRange: (styles: Partial<Style>) => void;
  clearStyling: () => void;
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
  setCurrentlyHighlighting: (value) => {
    set({ currentlyHighlighting: value });
  },

  highlightedStart: { row: 0, column: 0 },
  setHighlightedStart: (start) => {
    if (start === undefined) {
      set({ highlightedStart: { row: undefined, column: undefined } });
      return;
    }
    set({ highlightedStart: start });
  },
  highlightedEnd: { row: 0, column: 0 },
  setHighlightedEnd: (end) => {
    if (end === undefined) {
      set({ highlightedEnd: { row: undefined, column: undefined } });
      return;
    }
    set({ highlightedEnd: end });
  },
  clearHighlightedRange: () => {
    set(
      produce((state) => {
        if (
          state.highlightedStart.row !== undefined &&
          state.highlightedStart.column !== undefined &&
          state.highlightedEnd.row !== undefined &&
          state.highlightedEnd.column !== undefined
        ) {
          for (
            let i = state.highlightedStart.row;
            i <= state.highlightedEnd.row;
            i++
          ) {
            for (
              let j = state.highlightedStart.column;
              j <= state.highlightedEnd.column;
              j++
            ) {
              state.grid[i].cells[j].value = "";
            }
          }
        }
      }),
    );
  },
  applyStyleToRange: (styles) => {
    set(
      produce((state: GridStore) => {
        if (
          state.highlightedStart.row !== undefined &&
          state.highlightedStart.column !== undefined &&
          state.highlightedEnd.row !== undefined &&
          state.highlightedEnd.column !== undefined
        ) {
          for (
            let i = state.highlightedStart.row;
            i <= state.highlightedEnd.row;
            i++
          ) {
            for (
              let j = state.highlightedStart.column;
              j <= state.highlightedEnd.column;
              j++
            ) {
              for (const key in styles) {
                state.grid[i].cells[j].style = {
                  ...state.grid[i].cells[j].style,
                  [key]: styles[key as keyof Style],
                };
              }
            }
          }
        }
      }),
    );
  },
  clearStyling: () => {
    set(
      produce((state) => {
        for (let i = 0; i < state.grid.length; i++) {
          for (let j = 0; j < state.grid[i].cells.length; j++) {
            state.grid[i].cells[j].style = {
              textColor: "black",
              backgroundColor: "transparent",
              fontFamily: "Arial",
              fontSize: 12,
              bold: false,
              italic: false,
              underline: false,
              decimals: 0,
            };
          }
        }
      }),
    );
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
