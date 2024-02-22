import { useGridStore } from "@/store/grid";
import Header from "./Header";

const RowHeader = () => {
  const rowHeaders = useGridStore((state) => state.rowHeaders);

  return (
    <div>
      {rowHeaders.map((_row, i) => {
        return <Header key={i} headerNumber={i + 1} type="row" />;
      })}
    </div>
  );
};

export default RowHeader;
