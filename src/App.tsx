import "./App.css";
import ColHeaders from "./grid/ColHeaders";
import RowHeader from "./grid/RowHeaders";
import Ribbon from "@/ribbon/Ribbon";
import HighlightOverlay from "@/grid/HighlightOverlay";
import Grid from "./grid/Grid";

function App() {
  return (
    <div>
      <Ribbon />
      <div className="overflow-x-scroll">
        <div className="flex">
          <div className="h-4 w-8 text-transparent">Placeholder text</div>
          <ColHeaders />
        </div>
        <div className="relative flex border-collapse">
          <RowHeader />
          <Grid />
          <HighlightOverlay cellHeight={32} cellWidth={96} />
        </div>
      </div>
    </div>
  );
}

export default App;
