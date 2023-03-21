import React from 'react';
import './App.css';
import { IBANChecker } from './IbanChecker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>IBANs checker for Montenegro</h3>
        <IBANChecker />
      </header>
    </div>
  );
}

export default App;
