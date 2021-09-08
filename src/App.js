import React from 'react';
import { SmileyFace } from './SmileyFace';
import { CssNamedColorPie } from './CssNamedColorPie';
import { BasicBarChart, ScatterPot, LineChart, WorldMap } from './Chart';
import './App.css';

function App() {
  return (
    <div style={{ height: '100vh' }}>
      {/* <CssNamedColorChart /> */}
      {/* <BasicBarChart /> */}
      {/* <ScatterPot /> */}
      {/* <LineChart /> */}
      <WorldMap />
    </div>
  );
}

export default App;
