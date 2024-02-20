import { useGridStore } from "@/store";
import Header from "./Header";

const RowHeader = () => {
  const rowHeaders = useGridStore((state) => state.rowHeaders);

  console.log("rowHeaders", rowHeaders);
  return (
    <div>
      {rowHeaders.map((_row, i) => {
        return <Header key={i} headerNumber={i + 1} type="row" />;
      })}
    </div>
  );
};

export default RowHeader;
