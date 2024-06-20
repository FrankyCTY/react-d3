import React from 'react';
import { SmileyFace } from './SmileyFace';
import { CssNamedColorPie } from './CssNamedColorPie';
import { BasicBarChart, ScatterPot, LineChart, WorldMap } from './Chart';
import { Timeline } from './Timeline';
import './App.css';

function App() {
  return (
    <div style={{ height: '100vh' }}>
      {/* {<CssNamedColorPie />} */}
      {/* <BasicBarChart /> */}
      {/* {<ScatterPot />} */}
      {/* <LineChart /> */}
      {/* {<WorldMap />} */}
      <Timeline />
    </div>
  );
}

export default App;
