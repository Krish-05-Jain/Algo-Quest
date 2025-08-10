import React from 'react';

const CodeEditor = ({ code, setCode }) => (
  <textarea
    rows="15"
    cols="80"
    value={code}
    onChange={e => setCode(e.target.value)}
    placeholder="Write your C++ code here..."
  />
);

export default CodeEditor;
