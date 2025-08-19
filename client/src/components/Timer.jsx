import React, { useState, useEffect } from 'react';

const Timer = ({ seconds, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onTimeUp]);

  const minutesLeft = Math.ceil(timeLeft / 60);

  return <div>{minutesLeft} min left</div>;
};

export default Timer;
