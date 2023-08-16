import { useEffect, useState } from "react";
import Button from "./components/Button";
import Timer from "./components/Timer";

const App = () => {
  const [time, setTime] = useState(0);
  const [clonedTime, setClonedTime] = useState(time > 0 ? time : null);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimeAddedByUser, setIsTimeAddedByUser] = useState(false);

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  const updateTime = (passedSeconds) => {
    let hours = Math.floor(passedSeconds / 3600);
    let minutes = Math.floor((passedSeconds % 3600) / 60);
    let seconds = Math.floor(passedSeconds % 60);

    return {
      hours: formatTime(hours),
      minutes: formatTime(minutes),
      seconds: formatTime(seconds),
    };
  };

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) =>
          isTimeAddedByUser ? prevTime - 1 : prevTime + 1
        );
      }, 1000);
    } else if (time === 0) {
      setIsRunning(() => false);
      setIsTimeAddedByUser(() => false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, isTimeAddedByUser, time]);

  return (
    <div className="main-container">
      <h4 className="title">React Timer</h4>
      <input
        className="user-input"
        placeholder="Enter your time in seconds"
        value={!isTimeAddedByUser ? "" : clonedTime}
        onChange={(e) => {
          setTime(() => +e.target.value);
          setIsTimeAddedByUser(() => true);
        }}
      />
      <div className="clock-container">
        <Timer value={`${updateTime(time)?.hours}h`} />
        <span className="colon">:</span>
        <Timer value={`${updateTime(time)?.minutes}m`} />
        <span className="colon">:</span>
        <Timer value={`${updateTime(time)?.seconds}s`} />
      </div>
      <div className="button-container">
        <Button
          name={!isRunning ? "Start" : "Pause"}
          onClick={() => setIsRunning((prev) => !prev)}
        />
        <Button
          name="Reset"
          onClick={() => {
            setTime(() => 0);
            setIsRunning(() => false);
            setIsTimeAddedByUser(() => false);
            setClonedTime(() => time);
          }}
        />
      </div>
    </div>
  );
};

export default App;
