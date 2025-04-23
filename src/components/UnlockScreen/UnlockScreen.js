import React, { useState, useRef } from 'react';
import './UnlockScreen.css';

const UnlockScreen = function ({ pinLength = 4, onUnlock, hasError = false }) {
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

  const inputs = pin.map((digit, index) =>
    React.createElement('input', {
      key: index,
      type: 'text',
      inputMode: 'numeric',
      maxLength: 1,
      value: digit,
      readOnly: true,
      ref: (el) => (inputRefs.current[index] = el),
      className: `pin-input ${hasError ? 'error' : ''}`
    })
  );

  const keypad = [
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) =>
      React.createElement(
        'button',
        {
          key: n,
          onClick: () => handleKeypadClick(String(n))
        },
        n
      )
    ),
    React.createElement(
      'div',
      { key: 'row', className: 'keypad-bottom-row' },
      React.createElement(
        'button',
        { className: 'keypad-zero', onClick: () => handleKeypadClick('0') },
        '0'
      ),
      React.createElement(
        'button',
        { className: 'backspace', onClick: () => handleKeypadClick('←') },
        '←'
      )
    )
  ];

  return React.createElement(
    'div',
    { className: 'unlock-wrapper' },
    React.createElement('div', { className: 'unlock-screen' }, ...inputs),
    React.createElement('div', { className: 'keypad' }, ...keypad)
  );
};

export default UnlockScreen;
