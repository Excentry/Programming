import test from 'node:test';
import assert from 'node:assert/strict';
import { COLS, ROWS, collides, createEmptyBoard, gameReducer, getDropInterval, rotateShape } from './game.js';

function stateWith(shape, position, board = createEmptyBoard()) {
  const state = gameReducer(undefined, { type: 'RESET' });
  return { ...state, board, piece: { shape, type: shape.length === 4 ? 2 : 1, color: 3 }, position, nextPiece: { shape: [[1]], type: 1, color: 2 } };
}

test('board has the expected dimensions and independent rows', () => {
  const board = createEmptyBoard();
  assert.equal(board.length, ROWS);
  assert.equal(board[0].length, COLS);
  board[0][0] = 1;
  assert.equal(board[1][0], 0);
});

test('collisions include walls, floor and occupied cells', () => {
  const board = createEmptyBoard();
  board[4][4] = 1;
  assert.equal(collides([[1]], { x: -1, y: 0 }, board), true);
  assert.equal(collides([[1]], { x: 4, y: ROWS }, board), true);
  assert.equal(collides([[1]], { x: 4, y: 4 }, board), true);
  assert.equal(collides([[1]], { x: 0, y: 0 }, board), false);
});

test('rotation preserves a fixed pivot and rejects blocked rotations', () => {
  assert.deepEqual(rotateShape([[0, 0, 0], [1, 1, 1], [0, 1, 0]]), [[0, 1, 0], [1, 1, 0], [0, 1, 0]]);
  const state = stateWith([[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], { x: 3, y: 0 });
  const rotated = gameReducer(state, { type: 'ROTATE' });
  assert.equal(rotated.piece.shape.length, 4);
  assert.equal(collides(rotated.piece.shape, rotated.position, rotated.board), false);
  const secondTurn = gameReducer(rotated, { type: 'ROTATE' });
  const thirdTurn = gameReducer(secondTurn, { type: 'ROTATE' });
  const fullTurn = gameReducer(thirdTurn, { type: 'ROTATE' });
  assert.deepEqual(fullTurn.piece.shape, state.piece.shape);
});

test('O piece rotation is disabled in the original rotation system', () => {
  const state = { ...stateWith([[1, 1], [1, 1]], { x: 4, y: 0 }), piece: { shape: [[1, 1], [1, 1]], type: 0, color: 1 } };
  assert.equal(gameReducer(state, { type: 'ROTATE' }), state);
});

test('movement is bounded and soft drop scores only a successful step', () => {
  const state = stateWith([[1]], { x: 0, y: ROWS - 2 });
  const atFloor = gameReducer(state, { type: 'MOVE', dx: 0, dy: 1 });
  assert.equal(atFloor.position.y, ROWS - 1);
  assert.equal(atFloor.score, 1);
  const moved = gameReducer(state, { type: 'MOVE', dx: 1, dy: 0 });
  assert.deepEqual(moved.position, { x: 1, y: ROWS - 2 });
  const dropped = gameReducer(moved, { type: 'MOVE', dx: 0, dy: 1 });
  assert.equal(dropped.score, 1);
});

test('locking clears complete lines and awards score once', () => {
  const board = createEmptyBoard();
  board[ROWS - 1] = Array(COLS).fill(1);
  board[ROWS - 1][0] = 0;
  const state = stateWith([[1]], { x: 0, y: ROWS - 2 }, board);
  const locked = gameReducer(gameReducer(state, { type: 'TICK' }), { type: 'TICK' });
  assert.equal(locked.lines, 1);
  assert.equal(locked.score, 100);
  assert.deepEqual(locked.board[0], Array(COLS).fill(0));
  assert.equal(locked.board[ROWS - 1].every((cell) => cell === 0), true);
});

test('spawn collision ends the game and reset clears all counters', () => {
  const board = createEmptyBoard();
  board[0][4] = 1;
  const state = { ...stateWith([[1]], { x: 0, y: ROWS - 1 }, board), nextPiece: { shape: [[1]], color: 2 }, score: 700, lines: 10 };
  assert.equal(gameReducer(state, { type: 'TICK' }).gameOver, true);
  const reset = gameReducer(state, { type: 'RESET' });
  assert.equal(reset.score, 0);
  assert.equal(reset.lines, 0);
  assert.equal(reset.gameOver, false);
  assert.equal(reset.board.flat().every((cell) => cell === 0), true);
});

test('drop speed advances with levels and has a lower bound', () => {
  assert.equal(getDropInterval(0), 400);
  assert.equal(getDropInterval(10), 365);
  assert.equal(getDropInterval(200), 45);
});
