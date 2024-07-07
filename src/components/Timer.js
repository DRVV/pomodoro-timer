import React, { useState, useEffect } from "react";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(2); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  // const audio = new Audio('../audio/5-13 ゲットファンファーレ(アイテム).mp3');
  const audio = new Audio('/assets/audio/5-13 ゲットファンファーレ(アイテム).mp3');    
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval);
    } else if (isActive && timeLeft === 0) {
        clearInterval(interval);
        audio.play();

    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      <h1>{formatTime(timeLeft)}</h1>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? "Pause" : "Start"}
      </button>
      <button onClick={() => setTimeLeft(1500)}>Reset</button>
    </div>
  );
};

export default Timer;
