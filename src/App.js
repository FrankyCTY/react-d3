import React from 'react';
import { SmileyFace } from './SmileyFace';
import { CssNamedColorChart } from './CssNamedColorChart';
import { BasicBarChart } from './BarChart';
import './App.css';

function App() {
  return (
    <div style={{ height: '100vh' }}>
      {/* <CssNamedColorChart /> */}
      <BasicBarChart />
    </div>
  );
}

export default App;
