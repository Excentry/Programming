import { useState, useEffect, useRef } from 'react';

export function Tetris({ started, setStarted }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new window.Audio('./tetris.mp3');
      audio.volume = 0.03;
      audio.loop = true;
      audioRef.current = audio;
    }
  }, []);

  const ROWS = 20;
  const COLS = 10;

  function createEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  const PIECES = [
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 1, 1],
      [0, 1, 0],
    ],
    [[1, 1, 1, 1]],
    [
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 1],
    ],
  ];

  function getRandomPiece() {
    const shape = PIECES[Math.floor(Math.random() * PIECES.length)];
    return {
      shape,
    };
  }

  function getRandomColor() {
    return Math.floor(Math.random() * 7) + 1;
  }

  function getShadowY(shape, position, board) {
    let y = position.y;
    while (!checkCollision(shape, { x: position.x, y: y + 1 }, board)) {
      y++;
    }
    return y;
  }

  function getInitialX(shape) {
    if (shape.length === 2 && shape[0].length === 2) {
      return 4;
    }
    return 3;
  }

  const [board, setBoard] = useState(createEmptyBoard());
  const [score, setScore] = useState(0);
  const [piece, setPiece] = useState(getRandomPiece());
  const [color, setColor] = useState(getRandomColor());
  const [position, setPosition] = useState({
    x: getInitialX(piece.shape),
    y: 0,
  });
  const [prevX, setPrevX] = useState(position.x);
  const [gameOver, setGameOver] = useState(false);

  const shadowY = getShadowY(piece.shape, position, board);

  const GameBoard = board.map((row, y) =>
    row.map((cell, x) => {
      let filled = cell;

      piece.shape.forEach((rowPiece, dy) => {
        rowPiece.forEach((value, dx) => {
          if (value && y === shadowY + dy && x === position.x + dx && !cell) {
            filled = -color;
          }
        });
      });

      piece.shape.forEach((rowPiece, dy) => {
        rowPiece.forEach((value, dx) => {
          if (value && y === position.y + dy && x === position.x + dx) {
            filled = color;
          }
        });
      });

      return filled;
    })
  );

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setPosition((prevPosition) => ({
        ...prevPosition,
        x: prevPosition.x,
        y: prevPosition.y + 1,
      }));
    }, 400 - Math.floor(score / 300));
    return () => clearInterval(interval);
  }, [gameOver, score]);

  useEffect(() => {
    if (position.x < -1) {
      setPosition((prevPosition) => ({
        ...prevPosition,
        x: 0,
      }));
    }
    if (position.x > COLS - piece.shape[0].length + 1) {
      setPosition((prevPosition) => ({
        ...prevPosition,
        x: COLS - piece.shape[0].length,
      }));
    }

    if (checkCollision(piece.shape, { x: position.x, y: position.y }, board)) {
      const cameFromRight = position.x > prevX;
      const cameFromLeft = position.x < prevX;

      setPosition((prev) => ({
        ...prev,
        x: cameFromRight ? prev.x - 1 : cameFromLeft ? prev.x + 1 : prev.x,
      }));
    }

    setPrevX(position.x);
  }, [position.x]);

  function checkCollision(shape, pos, board) {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (!shape[y][x]) continue;
        const newY = pos.y + y;
        const newX = pos.x + x;

        if (newY >= ROWS || board[newY][newX] !== 0) return true;
      }
    }
    return false;
  }

  useEffect(() => {
    if (gameOver && audioRef.current) {
      audioRef.current.pause();
    }
  }, [gameOver]);

  useEffect(() => {
    if (gameOver && audioRef.current) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        movePiece(-1, 0);
      }
      if (e.key === 'ArrowRight') {
        movePiece(1, 0);
      }
      if (e.key === 'ArrowDown') {
        movePiece(0, 1);
        setScore((prevScore) => prevScore + 1);
      }
      if (e.key === 'ArrowUp') {
        rotatePiece();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  useEffect(() => {
    const shouldSolidify = piece.shape.some((rowPiece, dy) =>
      rowPiece.some((value, dx) => {
        if (!value) return false;
        const y = position.y + dy;
        const x = position.x + dx;
        return y >= ROWS - 1 || (y + 1 < ROWS && board[y + 1][x]);
      })
    );

    if (shouldSolidify) {
      setBoard((prevBoard) => {
        const newBoard = prevBoard.map((row) => [...row]);
        piece.shape.forEach((rowPiece, dy) => {
          rowPiece.forEach((value, dx) => {
            if (value) {
              const y = position.y + dy;
              const x = position.x + dx;
              if (
                y >= 0 &&
                y < newBoard.length &&
                x >= 0 &&
                x < newBoard[0].length
              ) {
                newBoard[y][x] = color;
              }
            }
          });
        });

        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
        if (linesCleared > 0) setScore((score) => score + linesCleared * 100);
        return clearedBoard;
      });

      const newPiece = getRandomPiece();
      const newPos = { x: getInitialX(newPiece.shape), y: 0 };
      if (checkCollision(newPiece.shape, newPos, board)) {
        setGameOver(true);
      } else {
        setPiece(newPiece);
        setPosition(newPos);
        setColor(getRandomColor());
      }
    }
  }, [position.y]);

  const movePiece = (dx, dy) => {
    setPosition((prevPosition) => ({
      ...prevPosition,
      x: prevPosition.x + dx,
      y: prevPosition.y + dy,
    }));
  };

  function rotate(matrix) {
    return matrix[0].map((_, i) => matrix.map((row) => row[i]).reverse());
  }

  function clearLines(board) {
    const newBoard = board.filter((row) => row.some((cell) => cell === 0));
    const linesCleared = ROWS - newBoard.length;

    while (newBoard.length < ROWS) {
      newBoard.unshift(Array(COLS).fill(0));
    }
    return { newBoard, linesCleared };
  }

  const rotatePiece = () => {
    setPiece((prev) => {
      const rotated = rotate(prev.shape);
      return {
        ...prev,
        shape: rotated,
      };
    });
  };

  function resetGame() {
    setBoard(createEmptyBoard());
    setScore(0);
    const newPiece = getRandomPiece();
    setPiece(newPiece);
    setColor(getRandomColor());
    setPosition({ x: getInitialX(newPiece.shape), y: 0 });
    setPrevX(0);
    setGameOver(false);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }

  function handleStart() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setStarted(true);
    resetGame();
  }

  if (!started) {
    return (
      <section className='menu'>
        <div className='menu-box'>
          <h1 className='menu-title'>🎮 TETRIS</h1>
          <p className='menu-subtitle'>¡Presiona para comenzar!</p>
          <button className='start-button' onClick={handleStart}>
            Iniciar Juego
          </button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className='board'>
        {GameBoard.map((row, rowIndex) => (
          <div key={rowIndex} className='row'>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${
                  cell
                    ? `filled type-${Math.abs(cell)}${cell < 0 ? ' ghost' : ''}`
                    : ''
                }`}
              />
            ))}
          </div>
        ))}
      </div>
      <span className='score'>Score: {score}</span>
      {gameOver && (
        <div className='game-over'>
          <h2>Game Over</h2>
          <p>Score: {score}</p>
          <button onClick={resetGame}>Reiniciar</button>
        </div>
      )}
    </section>
  );
}
