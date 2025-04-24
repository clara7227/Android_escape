import React, { useState, useEffect } from 'react';

import { Background, OverLay } from 'components/background';
import Home from 'containers/home';
import UnlockScreen from 'components/UnlockScreen/UnlockScreen';
import { loadSettings } from 'store/actions/index';
import StatusBar from 'components/statusbar';
import UnlockBackground from 'components/backgroundUnlock/index';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showUnlock, setShowUnlock] = useState(true); // Cambiado a true
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
      {!isUnlocked && <StatusBar hidetime={false} />}

      <div className="appwrap">
        {isUnlocked ? (
          <Home />
        ) : showUnlock ? (
          <div className="app-container">
            <h1>Desbloquea el teléfono</h1>
            {error && <p style={{ color: 'red' }}>Código incorrecto ❌</p>}
            <UnlockScreen onUnlock={handleUnlock} hasError={error} />
          </div>
        ) : null}
        {!isUnlocked ? <UnlockBackground /> : <Background />}
        <OverLay />
      </div>
    </div>
  );
}

export default App;
