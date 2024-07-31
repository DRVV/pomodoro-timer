import React, { useState, useEffect } from "react";
import CustomDurationPanel from "./CustomDurationPanel";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [workDuration, setWorkDuration] = useState(1500);
  const [breakDuration, setBreakDuration] = useState(300);
  const [sessionCounter, setSessionCounter] = useState(1);

  const breakDoneAudio = new Audio('/assets/audio/5-13 ゲットファンファーレ(アイテム).mp3');    
  const workDoneAudio = new Audio('/assets/audio/5-14 ゲットファンファーレ(克服の証 _ 貴重なアイテム).mp3');  
  const setDoneAudio = new Audio('/assets/audio/5-15 ゲットファンファーレ(大切なもの).mp3')
  const sessionMax = 4;
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval);
    } else if (isActive && timeLeft === 0) {
        // period over
        clearInterval(interval);
        if (isWorkTime) {
          // work time over, break starts
          if (sessionCounter % 4 === 0) {
            // set of sessions done.
            setDoneAudio.play();
          } else{
            // normal workdone
            workDoneAudio.play();
          }
          
        } else {
          // break time over, new work starts
          breakDoneAudio.play();
          setSessionCounter(sessionCounter + 1);
        }

        // switch betweeen work and break
        setIsWorkTime(!isWorkTime);
        setTimeLeft(isWorkTime ? breakDuration : workDuration);

        if (sessionCounter >= sessionMax) {
          setIsActive(false)
        }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isWorkTime, workDuration, breakDuration]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const resetButtonPressed = () => {
    setTimeLeft(workDuration); 
    setSessionCounter(1); // reset counter
    setIsWorkTime(true); // reset to work time
    setIsActive(false); // stop timer
  }

  return (
    <div>
      <h1>{formatTime(timeLeft)} {isWorkTime ? "" : "[break]"}</h1>
      <h3>session: #{sessionCounter}</h3>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? "Pause" : "Start"}
      </button>
      <button onClick={resetButtonPressed}>Reset</button>

      <CustomDurationPanel setWorkDuration={setWorkDuration} setBreakDuration={setBreakDuration} />
    </div>
  );
};

export default Timer;
