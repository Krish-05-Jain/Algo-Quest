import React from 'react';
import '../styles/OutputBox.css';
const OutputBox = ({ output }) => (
  <div>
    <h3>Output</h3>
    <pre>{output}</pre>
  </div>
);

export default OutputBox;
