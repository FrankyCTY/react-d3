import React from 'react';
import { scaleLinear, scaleOrdinal, extent, format } from 'd3';
import { useFetchCsvData } from './useFetchCsvData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { isCompositeComponent } from 'react-dom/test-utils';

const svgWidth = 960;
const svgHeight = 500;
const margin = { top: 20, right: 20, bottom: 90, left: 200 };

const chartInnerHeight = svgHeight - margin.top - margin.bottom;
const chartInnerWidth = svgWidth - margin.left - margin.right;

const xAxisLabelOffset = 80;
const yAxisLabelOffset = 80;

const horizontalTickLabelOffsetY = 25;

const csvUrl =
  'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv';

const xAxisLabel = 'Sepal Length';
const yAxisLabel = 'Sepal Width';
const xValueAccessor = (d) => d.sepal_length;
const yValueAccessor = (d) => d.sepal_width;
const colorValueAccessor = (d) => d.species;

const ScatterPot = () => {
  const csvData = useFetchCsvData(csvUrl);

  if (!csvData) return <pre>Loading...</pre>;

  const xScale = scaleLinear()
    .domain(extent(csvData, xValueAccessor))
    .range([0, chartInnerWidth])
    .nice();
  const yScale = scaleLinear()
    .domain(extent(csvData, yValueAccessor))
    .range([0, chartInnerHeight]);
  const colorScale = scaleOrdinal()
    .domain(csvData.map(colorValueAccessor))
    .range(['#E6842A', '#137B80', '#8E6C8A']);

  return (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <Marks
          data={csvData}
          xScale={xScale}
          yScale={yScale}
          colorScale={colorScale}
          xValueAccessor={xValueAccessor}
          yValueAccessor={yValueAccessor}
          colorValueAccessor={colorValueAccessor}
        />

        <text
          style={{ textAnchor: 'middle', fontSize: '2em' }}
          transform={`translate(${-yAxisLabelOffset}, ${
            chartInnerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>

        <text
          x={chartInnerWidth / 2}
          y={chartInnerHeight + xAxisLabelOffset}
          style={{ textAnchor: 'middle', fontSize: '2em' }}
        >
          {xAxisLabel}
        </text>
        <AxisBottom
          xScale={xScale}
          chartInnerHeight={chartInnerHeight}
          horizontalTickLabelOffsetY={horizontalTickLabelOffsetY}
          tickValueFormatter={(n) => format('.2s')(n).replace('G', 'B')}
        />

        <AxisLeft yScale={yScale} chartInnerWidth={chartInnerWidth} />
      </g>
    </svg>
  );
};

export { ScatterPot };
