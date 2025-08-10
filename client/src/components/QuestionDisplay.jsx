import React from 'react';

const QuestionDisplay = ({ question }) => {
  if (!question) return <p>Loading question...</p>;

  return (
    <div>
      <h2>{question.title}</h2>
      <p><b>Topic:</b> {question.topic}</p>
      <p><b>Level:</b> {question.level}</p>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{question.description}</pre>
    </div>
  );
};

export default QuestionDisplay;
