import React, { useEffect, useState } from 'react';
import './LockScreen.css';
import { Icon } from 'components/utils';
import { useSelector } from 'react-redux';
import { ClockDate } from '../widgets/index';
import StatusBar from 'components/statusbar';

const LockScreenClock = () => {
  const time = useSelector((state) => state.global.time);
  const fillZero = (x) => (x < 10 ? '0' : '') + x;

  return (
    <div className="lockscreen-clock">
      <div className="lockscreen-clock-time">
        <div>{fillZero(parseInt(time.hours))}</div>
        <div>{fillZero(parseInt(time.minutes))}</div>
      </div>
      <ClockDate className="text-sm mt-2"/>
    </div>
  );
};


const LockScreen = ({ onActivateUnlock }) => {
  const [time, setTime] = useState(new Date());
  const [isUnlocked, setIsUnlocked] = useState(false);


  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="lockscreen" onClick={onActivateUnlock}>
            {!isUnlocked && <StatusBar hidetime={true} />}
 <div className='lock-main'>

  <LockScreenClock/>
  <Icon
    className="lockscreen-icon"
    mui="Lock"
    out
    w={32}
    color="#fff"
    />
 </div>
    <p>Click to unlock</p>
  <div className="bt-nav-lock">
    <Icon className="press-in" mui="FlashlightOn" w={20} color="#fff" action="" />
    <Icon className="press-in" mui="CameraAlt" w={20} color="#fff" action="" />
  </div>
</div>

    
  );
};

export default LockScreen;
