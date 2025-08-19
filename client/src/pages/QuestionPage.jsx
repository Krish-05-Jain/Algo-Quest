import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import QuestionDisplay from '../components/QuestionDisplay';
import CodeEditor from '../components/CodeEditor';
import OutputBox from '../components/OutputBox';
import { AuthContext } from '../context/AuthContext';

const QuestionPage = () => {
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const { token } = useContext(AuthContext);

const [error, setError] = useState('');

useEffect(() => {
  console.log("Token being sent:", token);
  axios.get('http://localhost:5000/api/questions/random', {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => setQuestion(res.data))
  .catch(err => {
    console.error('Error fetching question:', err);
    setError('Error occurred while fetching question');
  });
}, [token]);


  const handleSubmit = () => {
  axios.post('http://localhost:5000/api/submissions/submit', {
    questionId: question._id,
    userCode: code
  }, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => setOutput(res.data.msg))
  .catch(() => setOutput('Error occurred'));
};


  return (
    <div>
      <QuestionDisplay question={question} />
      <CodeEditor code={code} setCode={setCode} />
      <button onClick={handleSubmit}>Submit</button>
      <OutputBox output={output} />
    </div>
  );
};

export default QuestionPage;
