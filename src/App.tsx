import "./App.css";
import ColHeaders from "./grid/ColHeaders";

import Row from "./grid/Row";
import RowHeader from "./grid/RowHeaders";
import Ribbon from "@/ribbon/Ribbon";
import { useGridStore } from "./store";

function App() {
  const grid = useGridStore((state) => state.grid);

  return (
    <div>
      <Ribbon />
      <div className="flex">
        <div className="h-4 w-8 text-transparent">Placeholder text</div>
        <ColHeaders />
      </div>
      <div className="flex border-collapse">
        <RowHeader />

        <div className="">
          {grid.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
