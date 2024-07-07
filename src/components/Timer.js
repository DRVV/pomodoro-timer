import React, { useState, useEffect } from "react";
import CustomDurationPanel from "./CustomDurationPanel";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(2); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [workDuration, setWorkDuration] = useState(1500);
  const [breakDuration, setBreakDuration] = useState(300);
  // const audio = new Audio('../audio/5-13 ゲットファンファーレ(アイテム).mp3');
  const workAudio = new Audio('/assets/audio/5-13 ゲットファンファーレ(アイテム).mp3');    
  const breakAudio = new Audio('/assets/audio/5-14 ゲットファンファーレ(克服の証 _ 貴重なアイテム).mp3');  
  
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval);
    } else if (isActive && timeLeft === 0) {
        // when the work timer go rang
        clearInterval(interval);
        if (isWorkTime) {
            workAudio.play();
        } else {
            breakAudio.play();
        }

        // switch betweeen work and break
        setIsWorkTime(!isWorkTime);
        setTimeLeft(isWorkTime ? breakDuration : workDuration);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isWorkTime, workDuration, breakDuration]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      
      <h1>{formatTime(timeLeft)} {isWorkTime ? "" : "[break]"}</h1>

      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? "Pause" : "Start"}
      </button>
      <button onClick={() => setTimeLeft(isWorkTime ? workDuration : breakDuration)}>Reset</button>

      <CustomDurationPanel setWorkDuration={setWorkDuration} setBreakDuration={setBreakDuration} />
    </div>
  );
};

export default Timer;
