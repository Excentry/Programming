export const ROWS = 20;
export const COLS = 10;

export const PIECES = [
  [[1, 1], [1, 1]],
  [[1, 1, 1], [0, 1, 0]],
  [[1, 1, 1, 1]],
  [[1, 1, 1], [1, 0, 0]],
  [[1, 1, 1], [0, 0, 1]],
  [[0, 1, 1], [1, 1, 0]],
  [[1, 1, 0], [0, 1, 1]],
];

export function createEmptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

export function createPiece() {
  const type = Math.floor(Math.random() * PIECES.length);
  const size = type === 2 ? 4 : type === 0 ? 2 : 3;
  const source = PIECES[type];
  const offsetY = type === 2 ? 1 : 0;
  const shape = Array.from({ length: size }, () => Array(size).fill(0));
  source.forEach((row, y) => row.forEach((cell, x) => {
    shape[y + offsetY][x] = cell;
  }));
  return {
    type,
    shape,
    color: Math.floor(Math.random() * 7) + 1,
  };
}

export function initialGameState() {
  const piece = createPiece();
  return {
    board: createEmptyBoard(),
    piece,
    nextPiece: createPiece(),
    position: { x: Math.floor((COLS - piece.shape[0].length) / 2), y: 0 },
    score: 0,
    lines: 0,
    isPaused: false,
    gameOver: false,
  };
}

export function collides(shape, position, board) {
  return shape.some((row, y) => row.some((cell, x) => {
    if (!cell) return false;
    const boardX = position.x + x;
    const boardY = position.y + y;
    return boardX < 0 || boardX >= COLS || boardY >= ROWS || (boardY >= 0 && board[boardY][boardX] !== 0);
  }));
}

export function rotateShape(shape) {
  return shape.map((_, y) => shape.map((__, x) => shape[shape.length - 1 - x][y]));
}

function clearCompletedLines(board) {
  const remaining = board.filter((row) => row.some((cell) => cell === 0));
  const cleared = ROWS - remaining.length;
  return {
    board: [...Array.from({ length: cleared }, () => Array(COLS).fill(0)), ...remaining],
    cleared,
  };
}

function lockPiece(state) {
  const board = state.board.map((row) => [...row]);
  state.piece.shape.forEach((row, y) => row.forEach((cell, x) => {
    const boardY = state.position.y + y;
    const boardX = state.position.x + x;
    if (cell && boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
      board[boardY][boardX] = state.piece.color;
    }
  }));

  const result = clearCompletedLines(board);
  const nextPiece = state.nextPiece;
  const position = { x: Math.floor((COLS - nextPiece.shape[0].length) / 2), y: 0 };
  return {
    ...state,
    board: result.board,
    piece: nextPiece,
    nextPiece: createPiece(),
    position,
    score: state.score + result.cleared * 100,
    lines: state.lines + result.cleared,
    gameOver: collides(nextPiece.shape, position, result.board),
  };
}

export function gameReducer(state, action) {
  if (action.type === 'RESET') return initialGameState();
  if (action.type === 'PAUSE') return { ...state, isPaused: !state.isPaused };
  if (state.gameOver || state.isPaused) return state;

  if (action.type === 'MOVE') {
    const position = { x: state.position.x + action.dx, y: state.position.y + action.dy };
    if (collides(state.piece.shape, position, state.board)) return state;
    return { ...state, position, score: state.score + (action.dy > 0 ? 1 : 0) };
  }

  if (action.type === 'ROTATE') {
    if (state.piece.type === 0) return state;
    const shape = rotateShape(state.piece.shape);
    return collides(shape, state.position, state.board)
      ? state
      : { ...state, piece: { ...state.piece, shape } };
  }

  if (action.type === 'TICK' || action.type === 'DROP') {
    let current = state;
    if (action.type === 'DROP') {
      while (!collides(current.piece.shape, { ...current.position, y: current.position.y + 1 }, current.board)) {
        current = { ...current, position: { ...current.position, y: current.position.y + 1 } };
      }
    } else {
      const position = { ...state.position, y: state.position.y + 1 };
      if (!collides(state.piece.shape, position, state.board)) return { ...state, position };
    }
    return lockPiece(current);
  }

  return state;
}

export function getDropInterval(lines) {
  return Math.max(45, 400 - Math.floor(lines / 10) * 35);
}

export function getGhostY(state) {
  let y = state.position.y;
  while (!collides(state.piece.shape, { ...state.position, y: y + 1 }, state.board)) y += 1;
  return y;
}
