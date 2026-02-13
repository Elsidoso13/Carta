import { useState, useCallback } from 'react';
import Heart from './components/Heart';
import CardStack from './components/CardStack';
import MusicPlayer from './components/MusicPlayer';
import './App.css';

function App() {
  const [stage, setStage] = useState(0); // 0: Heart, 1: CardStack, 2: MusicPlayer

  const handleHeartComplete = useCallback(() => {
    setStage(1);
  }, []);

  const handleCardClick = useCallback(() => {
    setStage(2);
  }, []);

  return (
    <div className="app-container">
      <div className={`transition-wrapper ${stage === 0 ? 'visible' : 'hidden'}`}>
        <Heart onComplete={handleHeartComplete} />
      </div>
      <div className={`transition-wrapper ${stage === 1 ? 'visible' : 'hidden'}`}>
        <CardStack isOpen={stage === 1} onClose={handleCardClick} />
      </div>
      <div className={`transition-wrapper ${stage === 2 ? 'visible' : 'hidden'}`}>
        <MusicPlayer isOpen={stage === 2} />
      </div>
    </div>
  );
}

export default App;
