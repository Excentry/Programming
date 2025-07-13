import { RainbowText } from './components/RainbowText.jsx';
import { Tetris } from './components/tetris.jsx';

export function App() {
  return (
    <section className='App'>
      <RainbowText> 
        React Tetris
      </RainbowText>

      <Tetris />
    </section>
  );
}
