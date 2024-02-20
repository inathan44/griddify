export function numberToCapitalLetter(number: number): string {
  return String.fromCharCode(number + 65);
}

export function isCellHighlighted(
  row: number,
  column: number,
  highlightedStart: { row: number | undefined; column: number | undefined },
  highlightedEnd: { row: number | undefined; column: number | undefined },
): boolean {
  if (
    highlightedStart.row === undefined ||
    highlightedStart.column === undefined ||
    highlightedEnd.row === undefined ||
    highlightedEnd.column === undefined
  ) {
    return false;
  }

  return (
    row >= highlightedStart.row &&
    column >= highlightedStart.column &&
    row <= highlightedEnd.row &&
    column <= highlightedEnd.column
  );
}
