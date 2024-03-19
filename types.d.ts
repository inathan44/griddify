export type Style = {
  textColor: string;
  fontSize: number;
  backgroundColor: string;
  fontFamily: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  decimals: number;
};

export type Cell = {
  row: number;
  column: number;
  formula: string | number | undefined;
  computedValue: string | number | undefined;
  style: Style;
};

export type Row = {
  cells: Cell[];
  row: number;
};

export type ParsedFormula = {
  operation: string;
  args: (ParsedFormula | number | string)[][];
};

export type Coords = {
  row: number;
  column: number;
};
