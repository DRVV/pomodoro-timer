import React, { useState } from "react";

const CustomDurationPanel = ({ setWorkDuration, setBreakDuration }) => {
  const [workInput, setWorkInput] = useState(25);
  const [breakInput, setBreakInput] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    setWorkDuration(workInput * 60); // Convert minutes to seconds
    setBreakDuration(breakInput * 60); // Convert minutes to seconds
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Work Duration (minutes):
          <input
            type="number"
            value={workInput}
            onChange={(e) => setWorkInput(e.target.value)}
            min="1"
          />
        </label>
      </div>
      <div>
        <label>
          Break Duration (minutes):
          <input
            type="number"
            value={breakInput}
            onChange={(e) => setBreakInput(e.target.value)}
            min="1"
          />
        </label>
      </div>
      <button type="submit">Set Durations</button>
    </form>
  );
};

export default CustomDurationPanel;
