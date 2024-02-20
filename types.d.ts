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
  value: string | number | undefined;
  style: Style;
};

export type Row = {
  cells: Cell[];
  row: number;
};
