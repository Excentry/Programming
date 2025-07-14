import { PIECES } from '../../components/pieces.js';

export function getRandomPiece() {
  const shape = PIECES[Math.floor(Math.random() * PIECES.length)];
  const posX = Math.floor(Math.random() * 8 + 1);
  return {
    shape,
    position: { x: posX, y: 0 },
  };
};
