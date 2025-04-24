import React, { useState, useRef } from 'react';
import './UnlockScreen.css';
import { Icon } from 'components/utils'; // Asegúrate de que esta ruta sea correcta


const UnlockScreen = function ({ pinLength = 4, onUnlock, hasError = false, onBack }) {
  const [pin, setPin] = useState(Array(pinLength).fill(''));
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRefs = useRef([]);

  const updatePin = (value, index) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < pinLength - 1) {
      setCurrentIndex(index + 1);
    }

    if (newPin.every((d) => d !== '')) {
      onUnlock(newPin.join(''));
    }
  };

  const handleKeypadClick = (digit) => {
    if (digit === '←') {
      if (currentIndex > 0 || pin[currentIndex] !== '') {
        const prevIndex = pin[currentIndex] === '' ? currentIndex - 1 : currentIndex;
        updatePin('', prevIndex);
        setCurrentIndex(prevIndex);
      }
    } else {
      if (currentIndex < pinLength) {
        updatePin(digit, currentIndex);
      }
    }
  };

  return (
    <div className="unlock-wrapper">
      <div className="unlock-screen">
        {pin.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            readOnly
            ref={(el) => (inputRefs.current[index] = el)}
            className={`pin-input ${hasError ? 'error' : ''}`}
          />
        ))}
      </div>
      <div className="keypad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button key={n} onClick={() => handleKeypadClick(String(n))}>
            {n}
          </button>
        ))}
        <div className="keypad-bottom-row">
          <button className="keypad-zero" onClick={() => handleKeypadClick('0')}>0</button>
          <Icon
  className="backspace button"
  mui="Backspace"
  out
  w={28}
  color="#fff"
  onClick={() => handleKeypadClick('←')}
/>

        </div>
      </div>
      <Icon
        className="back-button"
        mui="ArrowBack"
        out
        w={32}
        color="#fff"
        onClick={onBack}
      />
    </div>
  );
};

export default UnlockScreen;
