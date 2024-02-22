import { useGridStore } from "@/store/grid";
import type { Row } from "../../types";
import Cell from "./Cell";

type RowProps = {
  row: Row;
};

const Row = ({ row }: RowProps) => {
  const focusedCell = useGridStore((state) => state.focusedCell);

  return (
    <div className="flex border-x-[0.5px] border-gray-600 last:border-b-[0.5px]">
      {row.cells.map((cell, i) => {
        const isFocused =
          cell.row === focusedCell.row && cell.column === focusedCell.column;
        return <Cell key={i} cell={cell} isFocused={isFocused} />;
      })}
    </div>
  );
};

export default Row;
