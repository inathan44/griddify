import type { ParsedFormula, Coords, Row } from "../../types";

export function removeSpaces(input: string) {
  return input.replace(/\s/g, "");
}

export function evaluate(
  parsedFormula: ParsedFormula | string,
  grid: Row[],
): string | number | ParsedFormula | undefined {
  if (typeof parsedFormula === "string" || typeof parsedFormula === "number") {
    return parsedFormula;
  }

  switch (parsedFormula.operation) {
    case "SUM":
      try {
        return parsedFormula.args[0].reduce((acc: number, cur) => {
          if (typeof cur === "number") {
            return acc + cur;
          } else if (typeof cur === "string") {
            try {
              const coords = cellOrRangeToCoords(cur);
              // Use coords to calculate the value
              const values = getValuesFromRange(grid, coords);
              // if any values are not false, return an error
              if (typeof values === "string") {
                throw new Error(values);
              } else {
                const valuesParsed = values.map((val) => {
                  // if val is a string, check if it's a number
                  if (typeof val === "string") {
                    if (val.match(/^\d+$/)) {
                      return parseInt(val);
                    }
                  }
                  return val;
                });
                console.log("valuesParsed", valuesParsed);
                if (
                  valuesParsed.some(
                    (val) =>
                      val !== undefined &&
                      typeof val !== "number" &&
                      val !== "",
                  )
                ) {
                  throw new Error("Cannot sum a range with undefined values");
                } else {
                  const numberValues = valuesParsed.filter(
                    (val) => typeof val === "number",
                  ) as number[];
                  return numberValues.reduce((acc, value) => acc + value, 0);
                }
              }
            } catch (error) {
              console.log('error in "SUM" 2', error);
              return 0;
            }
          } else {
            const evaluated = evaluate(cur, grid);
            if (typeof evaluated === "number") {
              return acc + evaluated;
            } else {
              console.log(
                "Error evaulating: evaluate function should return a number",
              );
              return 0;
            }
          }
        }, 0);
      } catch (error) {
        console.log("Error in SUM", error);
      }
      break;

    // case "AVERAGE":
    //   return (
    //     parsedFormula.args.reduce((acc: number, cur) => {
    //       if (typeof cur === "number") {
    //         return acc + cur;
    //       } else {
    //         return acc + evaluate(cur);
    //       }
    //     }, 0) / parsedFormula.args.length
    //   );
    // case "MIN": {
    //   const numList = parsedFormula.args.map((val) => {
    //     if (typeof val === "number") {
    //       return val;
    //     } else {
    //       return evaluate(val);
    //     }
    //   });
    //   return Math.min(...numList);
    // }
    // case "MAX": {
    //   const numList = parsedFormula.args.map((val) => {
    //     if (typeof val === "number") {
    //       return val;
    //     } else {
    //       return evaluate(val);
    //     }
    //   });
    //   return Math.max(...numList);
    // }
    default:
      // If the parsedFormula is a number, return it directly
      if (typeof parsedFormula === "number") {
        return parsedFormula;
      }
      throw new Error(`Unknown operation: ${parsedFormula.operation}`);
  }
}

export function cellOrRangeToCoords(cellOrRange: string): {
  start: { row: number; column: number };
  end: { row: number; column: number };
} {
  // if it's a range
  if (cellOrRange.match(/^[A-Z][0-5]?[0-9]:[A-Z][0-5]?[0-9]$/)) {
    console.log("range");
    const [start, end] = cellOrRange.split(":");
    const startCoords = cellOrRangeToCoords(start);
    const endCoords = cellOrRangeToCoords(end);
    return {
      start: startCoords.start,
      end: endCoords.end,
    };
  }
  // If it's a single cell
  else if (cellOrRange.match(/^[A-Z][0-5]?[0-9]$/)) {
    console.log("cell");
    const col = cellOrRange[0];
    const row = cellOrRange.slice(1);
    const numberCol = col.charCodeAt(0) - 65;
    return {
      start: { row: parseInt(row) - 1, column: numberCol },
      end: { row: parseInt(row) - 1, column: numberCol },
    };
  }
  throw new Error("Invalid cell or range");
}

export function getValuesFromRange(
  grid: Row[],
  coords: {
    start: Coords;
    end: Coords;
  },
): (number | string | undefined)[] | string {
  const { start, end } = coords;
  if (start.row > end.row || start.column > end.column) {
    return "Invalid Range, start coords should be less than end coords";
  }
  // loop through the grid from start coords to end coords and return values in an array
  const values: (number | string | undefined)[] = [];
  for (let i = start.row; i <= end.row; i++) {
    for (let j = start.column; j <= end.column; j++) {
      values.push(grid[i].cells[j].computedValue);
    }
  }
  return values;
}
