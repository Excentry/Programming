
import { useState, useEffect } from 'react';

export function Tetris() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [score, setScore] = useState(0);

  return (
    <div className='board'>
      {board.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className='row'>
            {row.map((cell, cellIndex) => {
              return <div key={cellIndex} className='cell'></div>;
            })}
          </div>
        );
      })}
    </div>
  );
}
