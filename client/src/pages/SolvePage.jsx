import React, { useEffect, useState } from 'react';
import { submitCode } from '../api/submission';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';


const SolvePage = ({ questionId, token }) => {
  const [question, setQuestion] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [result, setResult] = useState(null);
  

  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await axios.get(`http://localhost:5000/api/questions/${questionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuestion(res.data);
    };

    fetchQuestion();
  }, [questionId, token]);

  const handleSubmit = async () => {
    setResult(null);
    const res = await submitCode(token, { questionId, userCode, customInput });
    setResult(res);
  };
  
  return (
    <div>
      {question && (
        <>
          <h2>{question.title}</h2>
          <p>{question.description}</p>

          <textarea
            rows="15"
            cols="80"
            placeholder="Write your C++ code here..."
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
          />

          <br />
          <textarea
            rows="5"
            cols="80"
            placeholder="Enter custom input (optional)..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
          />

          <br />
          <button onClick={handleSubmit}>Run & Submit</button>
          

          {result && (
            <div>
              <h4>Result:</h4>
              <p>Test Cases Passed: {result.passedCount} / {result.total}</p>
              {result.customOutput && (
                <div>
                  <strong>Output for Your Input:</strong>
                  <pre>{result.customOutput}</pre>
                </div>
              )}
              {result.customError && <p style={{ color: 'red' }}>{result.customError}</p>}
              {result.error && <p style={{ color: 'red' }}>{result.error}</p>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SolvePage;
