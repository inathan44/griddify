import Cell from './Cell';

type ColumnProps = {
  row: number;
  columns: number;
};

const Column = ({ columns, row }: ColumnProps) => {
  return (
    <div className='flex'>
      {Array.from({ length: columns }).map((col) => (
        <Cell key={`${row}:${col}`} />
      ))}
    </div>
  );
};

export default Column;
