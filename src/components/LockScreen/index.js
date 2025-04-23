// LockScreen.js
import React, { useEffect, useState } from 'react';
import './LockScreen.css';

const LockScreen = ({ onActivateUnlock }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');

  return (
    <div className="lockscreen" onClick={onActivateUnlock}>
      <div className="lockscreen-time">
        {hours}
        <span className="separator">:</span>
        {minutes}
      </div>
      <div className="lockscreen-icon">🔓</div>
    </div>
  );
};

export default LockScreen;
