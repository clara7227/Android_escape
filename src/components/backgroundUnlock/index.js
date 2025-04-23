import React, { useState, useEffect } from 'react';
import './back_unlock.scss';

const UnlockBackground = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const random = Math.floor(Math.random() * 1000);
    setImageUrl(`https://picsum.photos/720/1280?random=123&blur=5?${random}`);
  }, []);

  return (
    <div
      className="background unlock-background "
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    ></div>
  );
};

export default UnlockBackground;
