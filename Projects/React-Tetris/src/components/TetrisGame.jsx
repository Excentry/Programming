import { useState, useEffect } from 'react';
import { createEmptyBoard } from './Board.js';
import { getRandomPiece } from '../logic/functions/getRandomPieces.js';

export function Tetris() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [score, setScore] = useState(0);
  const [piece, setPiece] = useState(getRandomPiece());

  const color = Math.floor(Math.random() * 7) + 1;

  const GameBoard = board.map((row, y) =>
    row.map((cell, x) => {
      let filled = cell;
      piece.shape.forEach((rowPiece, dy) => {
        rowPiece.forEach((value, dx) => {
          if (
            value &&
            y === piece.position.y + dy &&
            x === piece.position.x + dx
          ) {
            filled = 1;
          }
        });
      });
      return filled;
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPiece((piece) => ({
        ...piece,
        position: { x: piece.position.x, y: piece.position.y + 1 },
      }));
    }, 10000000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        movePiece(-1, 0);
      }
      if (e.key === 'ArrowRight') {
        movePiece(1, 0);
      }
      if (e.key === 'ArrowDown') {
        movePiece(0, 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const movePiece = (dx, dy) => {
    setPiece((prevPiece) => ({
      ...prevPiece,
      position: { x: prevPiece.position.x + dx, y: prevPiece.position.y + dy },
    }));
  };

  return (
    <div className='board'>
      {GameBoard.map((row, rowIndex) => (
        <div key={rowIndex} className='row'>
          {row.map((cell, colIndex) => (
            <div key={colIndex} className={`cell ${cell ? `filled type-${color}` : ''}`} />
          ))}
        </div>
      ))}
    </div>
  );
}
