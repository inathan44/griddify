import { useGridStore } from "@/store";
import Header from "@/grid/Header";

const ColHeaders = () => {
  const colHeaders = useGridStore((state) => state.colHeaders);
  return (
    <div className="flex">
      {colHeaders.map((_col, i) => {
        return <Header key={i} headerNumber={i + 1} type="column" />;
      })}
    </div>
  );
};

export default ColHeaders;
