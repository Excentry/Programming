import { useState, useEffect, useRef } from 'react';
import { getStorageMusic, saveMusic } from '../logic/storage/MusicPlay';
import { FaArrowUp, FaArrowLeft, FaArrowDown, FaArrowRight } from 'react-icons/fa';

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

  const KEYS = {
    rotate: ['ArrowUp', 'w', 'W'],
    left: ['ArrowLeft', 'a', 'A'],
    down: ['ArrowDown', 's', 'S'],
    right: ['ArrowRight', 'd', 'D'],
    pause: ['p', 'P'],
    reset: ['r', 'R'],
  };

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
  const [nextPiece, setNextPiece] = useState(getRandomPiece());
  const [color, setColor] = useState(getRandomColor());
  const [position, setPosition] = useState({
    x: getInitialX(piece.shape),
    y: 0,
  });
  const [prevX, setPrevX] = useState(position.x);
  const [gameOver, setGameOver] = useState(false);
  const [lines, setLines] = useState(0);
  const [menuOut, setMenuOut] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(getStorageMusic());
  const [downInterval, setDownInterval] = useState(null);
  const [downTimeout, setDownTimeout] = useState(null);
  const [isRestart, setIsRestart] = useState(false);

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
    if (gameOver || isPaused || isRestart) return;
    const interval = setInterval(() => {
      setPosition((prevPosition) => ({
        ...prevPosition,
        x: prevPosition.x,
        y: prevPosition.y + 1,
      }));
    }, Math.max(45, 400 - (Math.floor(score / 300) + lines)));
    return () => clearInterval(interval);
  }, [gameOver, score, lines, isPaused, isRestart]);

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

  function confirmRestart() {
    setIsRestart(true);

    if (isPaused) {
      togglePause();
    }
  }

  function handleRestart() {
    setIsRestart(false);
    setShowBoard(false);
    setTimeout(() => {
      resetGame();
      setShowBoard(true);
    }, 600);
  }

  const handleMove = (key) => {
    if (KEYS.reset.includes(key)) {
      confirmRestart();
      return;
    }

    if (KEYS.pause.includes(key)) {
      togglePause();
      return;
    }
    if (isPaused || isRestart) return;

    if (KEYS.left.includes(key)) {
      movePiece(-1, 0);
    }
    if (KEYS.right.includes(key)) {
      movePiece(1, 0);
    }
    if (KEYS.down.includes(key)) {
      movePiece(0, 1);
      setScore((prevScore) => prevScore + 1);
    }
    if (KEYS.rotate.includes(key)) {
      rotatePiece();
    }
  };

  useEffect(() => {
    if (gameOver) return;
    const handleKeyDown = (e) => {
      handleMove(e.key);
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
        if (linesCleared > 0) {
          setScore((score) => score + linesCleared * 100);
          setLines((lines) => lines + linesCleared);
        }
        return clearedBoard;
      });

      const newPiece = nextPiece;
      const newPos = { x: getInitialX(newPiece.shape), y: 0 };
      if (checkCollision(newPiece.shape, newPos, board)) {
        setGameOver(true);
      } else {
        setPiece(newPiece);
        setPosition(newPos);
        setColor(getRandomColor());
        setNextPiece(getRandomPiece());
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

  function setAudio(isExit = false) {
    if (audioRef.current && musicPlaying) {
      audioRef.current.currentTime = 0;
      isExit ? audioRef.current.pause() : audioRef.current.play();
    }
  }

  function resetGame() {
    setBoard(createEmptyBoard());
    setScore(0);
    const newPiece = getRandomPiece();
    setPiece(newPiece);
    setColor(getRandomColor());
    setPosition({ x: getInitialX(newPiece.shape), y: 0 });
    setPrevX(0);
    setGameOver(false);
    setAudio();
  }

  function handleStart() {
    setMenuOut(true);
    setTimeout(() => {
      setAudio();
      setStarted(true);
      resetGame();
      setShowBoard(true);
    }, 600);
  }

  function togglePause() {
    setIsPaused((prev) => !prev);
  }

  function handleExit() {
    setStarted(false);
    setIsPaused(false);
    setGameOver(false);
    setShowBoard(false);
    setMenuOut(false);
    setAudio(true);
  }

  function toggleMusic() {
    const newState = !musicPlaying;

    if (!newState) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setMusicPlaying(newState);
    saveMusic(newState);
  }

  const startPressingDown = () => {
    handleMove('ArrowDown');

    const timeout = setTimeout(() => {
      const interval = setInterval(() => handleMove('ArrowDown'), 40);

      setDownInterval(interval);
    }, 400);

    setDownTimeout(timeout);
  };

  const stopPressingDown = () => {
    clearInterval(downInterval);
    setDownInterval(null);
    clearTimeout(downTimeout);
    setDownTimeout(null);
  };

  if (!started) {
    return (
      <section className={`menu ${menuOut ? 'fade-out' : ''}`}>
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
      {!gameOver && !isRestart && (
        <button className='pause-button' onClick={() => togglePause()}>
          {isPaused ? 'Continuar' : 'Pausa'}
        </button>
      )}

      <div className={`next-preview ${showBoard ? 'fade-in-up' : ''}`}>
        <span>Next Piece</span>
        <div className='next-piece'>
          {nextPiece.shape.map((row, y) => (
            <div key={y} className='row'>
              {row.map((cell, x) => (
                <div
                  key={x}
                  className={`cell ${cell ? 'filled type-' + cell : ''}`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={`tetris-container ${showBoard ? 'fade-in-up' : ''}`}>
        <div className='board'>
          {GameBoard.map((row, rowIndex) => (
            <div key={rowIndex} className='row'>
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={`cell ${
                    cell
                      ? `filled type-${Math.abs(cell)}${
                          cell < 0 ? ' ghost' : ''
                        }`
                      : ''
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={`arrow-keys ${showBoard ? 'fade-in-up' : ''}`}>
        <span className='key' onClick={() => handleMove('ArrowUp')}>
          <FaArrowUp />
        </span>
        <div className='middle-row'>
          <span className='key' onClick={() => handleMove('ArrowLeft')}>
            <FaArrowLeft />
          </span>
          <span
            className='key'
            onMouseDown={startPressingDown}
            onMouseUp={stopPressingDown}
            onMouseLeave={stopPressingDown}
            onTouchStart={startPressingDown}
            onTouchEnd={stopPressingDown}
          >
            <FaArrowDown />
          </span>
          <span className='key' onClick={() => handleMove('ArrowRight')}>
            <FaArrowRight />
          </span>
        </div>
      </div>

      <div className={`score ${showBoard ? 'fade-in-up' : ''}`}>
        <span>Score: {score}</span>
        <span>Lines: {lines}</span>
      </div>

      {isRestart && (
        <div className='bg-blur'>
          <div className='reset-content'>
            <h2>¿Seguro que quieres reiniciar?</h2>
            <div className='reset-buttons'>
              <button onClick={handleRestart}>Sí</button>
              <button onClick={() => setIsRestart(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      {isPaused && (
        <div className='bg-blur'>
          <div className='pause-overlay'>
            <h2>JUEGO EN PAUSA</h2>
            <p>Presiona P para continuar</p>

            <div className='pause-buttons'>
              <button onClick={toggleMusic}>
                {musicPlaying ? '🔇 Silenciar Música' : '🔊 Reanudar Música'}
              </button>
              <button onClick={confirmRestart}>🔄 Reiniciar</button>
              <button onClick={handleExit}>🚪 Salir al Menú</button>
            </div>
          </div>
        </div>
      )}

      {gameOver && (
        <div className='bg-blur'>
          <div className='game-over'>
            <h2>Game Over</h2>
            <p>Score: {score}</p>
            <p>Lines: {lines}</p>
            <button onClick={handleRestart}>Reiniciar</button>
          </div>
        </div>
      )}
    </section>
  );
}
