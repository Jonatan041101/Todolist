import React from 'react';

interface Props {
  move: boolean;
  handleMove: () => void;
}

export default function SwitchButton({ move, handleMove }: Props) {
  return (
    <div className="switch" onClick={handleMove}>
      <div data-move={move} className="switch__area switch__move"></div>
    </div>
  );
}
