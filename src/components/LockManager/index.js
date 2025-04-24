// components/LockManager/index.js
import React, { useState } from 'react';
import LockScreen from 'components/LockScreen';
import UnlockScreen from 'components/UnlockScreen/UnlockScreen';

const CORRECT_PIN = '1234';

const LockManager = ({ onUnlock }) => {
  const [showUnlock, setShowUnlock] = useState(false);
  const [showLock, setShowLock] = useState(true);
  const [error, setError] = useState(false);

  const handlePinUnlock = (pin) => {
    if (pin === CORRECT_PIN) {
      setError(false);
      onUnlock(); // <- Notifica a App.js que se desbloqueó
    } else {
      setError(true);
    }
  };

  if (showUnlock) {
    return (
      <div className="app-container fade-in">
        <h1>Enter passcode to unlock</h1>
        {error && <p style={{ color: 'red' }}>Incorrect passcode ❌</p>}
        <UnlockScreen
          onUnlock={handlePinUnlock}
          hasError={error}
          onBack={() => {
            setShowUnlock(false);
            setShowLock(true);
            setError(false);
          }}
        />
      </div>
    );
  }

  if (showLock) {
    return (
      <div className="fade-in">
        <LockScreen onActivateUnlock={() => {
          setShowLock(false);
          setShowUnlock(true);
        }} />
      </div>
    );
  }

  return null;
};

export default LockManager;
