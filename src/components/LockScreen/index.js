// LockScreen.js
import React, { useEffect, useState } from 'react';
import './LockScreen.css';
import { Icon } from 'components/utils';
import { MinimalVertClock } from 'components/widgets/index';


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
  <MinimalVertClock />
  <Icon
    className="lockscreen-icon"
    mui="Lock"
    out
    w={32}
    color="#fff"
    />
    <p>Haz click para desbloquear</p>
  <div className="bt-nav-container">
    <Icon className="press-in" mui="FlashlightOn" w={20} color="#fff" action="" />
    <Icon className="press-in" mui="CameraAlt" w={20} color="#fff" action="" />
  </div>
</div>

    
  );
};

export default LockScreen;
