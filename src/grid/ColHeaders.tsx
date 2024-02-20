import { useGridStore } from "@/store";
import Header from "@/grid/Header";

const ColHeaders = () => {
  const colHeaders = useGridStore((state) => state.colHeaders);
  /* when I get to resizing, maybe try doing something like this:
   The parent component which in this case is App.tsx with the div that has the class of overflow-x-scroll
     use the getLayout and onResize props to find adjust cells to the size you want being
     the new size of the resized column/row and keep old size of previous cells
     THis means the total width of the parent will grow or shrink depending on the size of the cells
     */
  return (
    <>
      <div className="flex">
        {colHeaders.map((_col, i) => {
          return <Header key={i} headerNumber={i + 1} type="column" />;
        })}
      </div>
    </>
  );
};

export default ColHeaders;
