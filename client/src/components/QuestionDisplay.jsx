import React, { useState } from 'react';
import '../styles/QuestionDisplay.css';
import Timer from './Timer';
const QuestionDisplay = ({ question }) => {
  const [timeUp, setTimeUp] = useState(false);
  const [showHint, setShowHint] = useState(false);
  if (!question) return <p>Loading question...</p>;

  return (
    <div>
      {!timeUp && <Timer seconds={1500} onTimeUp={() => setTimeUp(true)} />}
      {timeUp && <p>Time's up!</p>}
      <h2>{question.title}</h2>
      <p><b>Topic:</b> {question.topic}</p>
      <p><b>Level:</b> {question.level}</p>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{question.description}</pre>
      <button onClick={() => setShowHint(!showHint)}>
        {showHint ? "Hide Hint" : "Show Hint"}
      </button>

      {showHint && <p style={{ background: "black", padding: "10px" }}>{question.hint}</p>}
    </div>
  );
};

export default QuestionDisplay;
