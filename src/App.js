import React from 'react';
import { SmileyFace } from './SmileyFace';
import { CssNamedColorChart } from './CssNamedColorChart';
import { BasicBarChart, ScatterPot } from './Chart';
import './App.css';

function App() {
  return (
    <div style={{ height: '100vh' }}>
      {/* <CssNamedColorChart /> */}
      {/* <BasicBarChart /> */}
      <ScatterPot />
    </div>
  );
}

export default App;
