import { useEffect, useReducer, useRef, useState } from 'react';
import { FaArrowRotateRight } from 'react-icons/fa6';
import { FaArrowLeft, FaArrowDown, FaArrowRight, FaPause, FaPlay } from 'react-icons/fa';
import { getStorageMusic, saveMusic } from '../logic/storage/MusicPlay';
import { gameReducer, getDropInterval, getGhostY, initialGameState } from '../logic/game';

export function Tetris({ started, setStarted }) {
  const [game, dispatch] = useReducer(gameReducer, undefined, initialGameState);
  const [menuOut, setMenuOut] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [isRestart, setIsRestart] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(getStorageMusic);
  const audioRef = useRef(null);
  const startTimerRef = useRef(null);
  const restartTimerRef = useRef(null);
  const softDropTimeoutRef = useRef(null);
  const softDropIntervalRef = useRef(null);

  useEffect(() => {
    const audio = new window.Audio('/tetris.mp3');
    audio.volume = 0.03;
    audio.loop = true;
    audioRef.current = audio;
    return () => {
      audio.pause();
      clearTimeout(startTimerRef.current);
      clearTimeout(restartTimerRef.current);
      clearTimeout(softDropTimeoutRef.current);
      clearInterval(softDropIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!started || game.gameOver || game.isPaused || isRestart) return undefined;
    const interval = window.setInterval(() => dispatch({ type: 'TICK' }), getDropInterval(game.lines));
    return () => window.clearInterval(interval);
  }, [started, game.gameOver, game.isPaused, game.lines, isRestart]);

  useEffect(() => {
    if (game.gameOver) audioRef.current?.pause();
  }, [game.gameOver]);

  useEffect(() => {
    if (!started || game.gameOver || isRestart) return undefined;
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      const isGameKey = ['arrowleft', 'a', 'arrowright', 'd', 'arrowdown', 's', 'arrowup', 'w', 'p', 'r'].includes(key);
      if (isGameKey) event.preventDefault();
      if (key === 'p') dispatch({ type: 'PAUSE' });
      else if (key === 'r') setIsRestart(true);
      else if (key === 'arrowleft' || key === 'a') dispatch({ type: 'MOVE', dx: -1, dy: 0 });
      else if (key === 'arrowright' || key === 'd') dispatch({ type: 'MOVE', dx: 1, dy: 0 });
      else if (key === 'arrowdown' || key === 's') dispatch({ type: 'MOVE', dx: 0, dy: 1 });
      else if (key === 'arrowup' || key === 'w') dispatch({ type: 'ROTATE' });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [started, game.gameOver, isRestart]);

  const toggleMusic = () => {
    const enabled = !musicPlaying;
    if (enabled) audioRef.current?.play().catch(() => {});
    else audioRef.current?.pause();
    setMusicPlaying(enabled);
    saveMusic(enabled);
  };

  const playAudio = () => {
    if (musicPlaying) audioRef.current?.play().catch(() => {});
  };

  const startGame = () => {
    setMenuOut(true);
    startTimerRef.current = window.setTimeout(() => {
      dispatch({ type: 'RESET' });
      setStarted(true);
      setShowBoard(true);
      setMenuOut(false);
      playAudio();
    }, 600);
  };

  const restartGame = () => {
    setIsRestart(false);
    setShowBoard(false);
    restartTimerRef.current = window.setTimeout(() => {
      dispatch({ type: 'RESET' });
      setShowBoard(true);
      playAudio();
    }, 600);
  };

  const exitGame = () => {
    dispatch({ type: 'PAUSE' });
    setStarted(false);
    setShowBoard(false);
    setMenuOut(false);
    audioRef.current?.pause();
  };

  const startSoftDrop = (event) => {
    event.preventDefault();
    stopSoftDrop();
    dispatch({ type: 'MOVE', dx: 0, dy: 1 });
    softDropTimeoutRef.current = window.setTimeout(() => {
      softDropIntervalRef.current = window.setInterval(() => dispatch({ type: 'MOVE', dx: 0, dy: 1 }), 40);
    }, 400);
  };

  const stopSoftDrop = () => {
    clearTimeout(softDropTimeoutRef.current);
    clearInterval(softDropIntervalRef.current);
  };

  useEffect(() => {
    if (game.isPaused || game.gameOver || isRestart) stopSoftDrop();
  }, [game.isPaused, game.gameOver, isRestart]);

  const ghostY = getGhostY(game);
  const board = game.board.map((row, y) => row.map((cell, x) => {
    let value = cell;
    game.piece.shape.forEach((pieceRow, dy) => pieceRow.forEach((filled, dx) => {
      if (!filled) return;
      if (y === ghostY + dy && x === game.position.x + dx && !cell) value = -game.piece.color;
      if (y === game.position.y + dy && x === game.position.x + dx) value = game.piece.color;
    }));
    return value;
  }));

  if (!started) {
    return (
      <section className={`menu ${menuOut ? 'fade-out' : ''}`}>
        <div className='menu-box'>
          <h1 className='menu-title'>🎮 TETRIS</h1>
          <p className='menu-subtitle'>¡Presiona para comenzar!</p>
          <button className='start-button' onClick={startGame}>Iniciar Juego</button>
        </div>
      </section>
    );
  }

  return (
    <section>
      {!game.gameOver && !isRestart && <button className='pause-button' onClick={() => dispatch({ type: 'PAUSE' })}>{game.isPaused ? <FaPlay /> : <FaPause />}</button>}
      <div className={`next-preview ${showBoard ? 'fade-in-up' : ''}`}>
        <span>Next Piece</span>
        <div className='next-piece'>{game.nextPiece.shape.map((row, y) => <div key={y} className='row'>{row.map((cell, x) => <div key={x} className={`cell ${cell ? `filled type-${game.nextPiece.color}` : ''}`} />)}</div>)}</div>
      </div>
      <div className={`tetris-container ${showBoard ? 'fade-in-up' : ''}`}>
        <div className='board'>{board.map((row, y) => <div key={y} className='row'>{row.map((cell, x) => <div key={x} className={`cell ${cell ? `filled type-${Math.abs(cell)}${cell < 0 ? ' ghost' : ''}` : ''}`} />)}</div>)}</div>
      </div>
      <div className={`arrow-keys ${showBoard ? 'fade-in-up' : ''}`}>
        <span className='key' onClick={() => dispatch({ type: 'ROTATE' })}><FaArrowRotateRight /></span>
        <div className='middle-row'>
          <span className='key' onClick={() => dispatch({ type: 'MOVE', dx: -1, dy: 0 })}><FaArrowLeft /></span>
          <span className='key' onPointerDown={startSoftDrop} onPointerUp={stopSoftDrop} onPointerLeave={stopSoftDrop} onPointerCancel={stopSoftDrop}><FaArrowDown /></span>
          <span className='key' onClick={() => dispatch({ type: 'MOVE', dx: 1, dy: 0 })}><FaArrowRight /></span>
        </div>
      </div>
      <div className={`score ${showBoard ? 'fade-in-up' : ''}`}>
        <span>Score: {game.score}</span><span>Lines: {game.lines}</span><span>Level: {Math.floor(game.lines / 10) + 1}</span>
      </div>
      {isRestart && <div className='bg-blur'><div className='reset-content'><h2>¿Seguro que quieres reiniciar?</h2><div className='reset-buttons'><button onClick={restartGame}>Sí</button><button onClick={() => setIsRestart(false)}>No</button></div></div></div>}
      {game.isPaused && <div className='bg-blur'><div className='pause-overlay'><h2>JUEGO EN PAUSA</h2><p>Presiona P para continuar</p><div className='pause-buttons'><button onClick={toggleMusic}>{musicPlaying ? '🔇 Silenciar Música' : '🔊 Reanudar Música'}</button><button onClick={() => setIsRestart(true)}>🔄 Reiniciar</button><button onClick={exitGame}>🚪 Salir al Menú</button></div></div></div>}
      {game.gameOver && <div className='bg-blur'><div className='game-over'><h2>Game Over</h2><p>Score: {game.score}</p><p>Lines: {game.lines}</p><button onClick={restartGame}>Reiniciar</button></div></div>}
    </section>
  );
}
