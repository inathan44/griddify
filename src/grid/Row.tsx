import Column from './Column';

type RowProps = {
  rows: number;
};

const Row = ({ rows }: RowProps) => {
  return (
    <div>
      {Array.from({ length: rows }).map((row, i) => (
        <Column key={i} columns={10} row={i} />
      ))}
    </div>
  );
};

export default Row;
