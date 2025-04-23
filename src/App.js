import React, { useState, useEffect } from 'react';

import { Background, OverLay } from 'components/background';
import Home from 'containers/home';
import UnlockScreen from 'components/UnlockScreen/UnlockScreen';
import { loadSettings } from 'store/actions/index';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const CORRECT_PIN = '1234';

  useEffect(() => {
    if (!window.onstart) {
      window.onstart = loadSettings();
    }
  }, []);

  const handleUnlock = (pin) => {
    if (pin === CORRECT_PIN) {
      setError(false);
      setIsUnlocked(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="App">
      <div className="appwrap">
        {isUnlocked ? (
          <Home />
        ) : (
          <div className="app-container">
            <h1>Desbloquea el teléfono</h1>
            {error && <p style={{ color: 'red' }}>Código incorrecto ❌</p>}
            <UnlockScreen onUnlock={handleUnlock} hasError={error} />
          </div>
        )}
        <Background />
        <OverLay />
      </div>
    </div>
  );
}

export default App;
