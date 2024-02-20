import type { Row } from "../../types";
import Cell from "./Cell";

type RowProps = {
  row: Row;
};

const Row = ({ row }: RowProps) => {
  return (
    <div className="flex border-x-[0.5px] border-gray-600 last:border-b-[0.5px]">
      {row.cells.map((cell, i) => (
        <Cell key={i} cell={cell} />
      ))}
    </div>
  );
};

export default Row;
