// App.js
import React, { useState, useEffect } from 'react';
import { Background, OverLay } from 'components/background';
import Home from 'containers/home';
import UnlockBackground from 'components/backgroundUnlock/index';
import StatusBar from 'components/statusbar';
import LockManager from 'components/LockManager';
import { loadSettings } from 'store/actions/index';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (!window.onstart) {
      window.onstart = loadSettings();
    }
  }, []);

  return (
    <div className="App">
      {!isUnlocked && <StatusBar hidetime={true} />}
      <div className="appwrap">
        {isUnlocked ? <Home /> : <LockManager onUnlock={() => setIsUnlocked(true)} />}
        {!isUnlocked ? <UnlockBackground /> : <Background />}
        <OverLay />
      </div>
    </div>
  );
}

export default App;
