// componente Square
export const Square = ({ index, children, isSelected, updateBoard }) => {
  // condicional clase de estilo
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleSwitch = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleSwitch} className={className}>
      {children}
    </div>
  );
};
