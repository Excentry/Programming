import { useState } from 'react';
import { RainbowText } from './components/RainbowText.jsx';
import { Tetris } from './components/TetrisGame.jsx';

export function App() {
  const [started, setStarted] = useState(false);

  return (
    <section className='App'>
      {started && <RainbowText>React Tetris</RainbowText>}

      <Tetris started={started} setStarted={setStarted}/>
    </section>
  );
}
