import React from 'react';
// import {} from 'd3';
import { useData } from './useData';
import { Marks } from './Marks';

const svgWidth = 960;
const svgHeight = 500;

const csvUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json';

const WorldMap = () => {
  const data = useData(csvUrl);

  if (!data) return <pre>Loading...</pre>;

  return (
    <svg width={svgWidth} height={svgHeight}>
      <Marks data={data} />
    </svg>
  );
};

export { WorldMap };
