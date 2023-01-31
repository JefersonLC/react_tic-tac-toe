export default function Square({ children, index, changeBoard, isSelected }) {
  const className = `square ${isSelected ? 'selected' : ''}`;
  return (
    <div className={className} onClick={() => changeBoard(index)}>
      {children}
    </div>
  );
}
