import Row from "./Row";
import { useGridStore } from "@/store/grid";

const Grid = () => {
  const grid = useGridStore((state) => state.grid);

  return (
    <div className="">
      {grid.map((row, i) => (
        <Row key={i} row={row} />
      ))}
    </div>
  );
};

export default Grid;
