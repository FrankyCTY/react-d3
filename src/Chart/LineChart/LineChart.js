import React from 'react';
import { scaleLinear, extent, scaleTime, timeFormat } from 'd3';
import { useFetchCsvData } from './useFetchCsvData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const svgWidth = 960;
const svgHeight = 500;
const margin = { top: 20, right: 20, bottom: 90, left: 200 };

const chartInnerHeight = svgHeight - margin.top - margin.bottom;
const chartInnerWidth = svgWidth - margin.left - margin.right;

const xAxisLabelOffset = 80;
const yAxisLabelOffset = 80;

const horizontalTickLabelOffsetY = 25;

const csvUrl =
  'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv';

const xAxisLabel = 'Time';
const yAxisLabel = 'Temperature';
const xValueAccessor = (d) => d.timestamp;
const yValueAccessor = (d) => d.temperature;

const LineChart = () => {
  const csvData = useFetchCsvData(csvUrl);

  if (!csvData) return <pre>Loading...</pre>;

  const xScale = scaleTime()
    .domain(extent(csvData, xValueAccessor))
    .range([0, chartInnerWidth])
    .nice();
  const yScale = scaleLinear()
    .domain(extent(csvData, yValueAccessor))
    // reverse the range order so that temperature is from low to high (bottom to top)
    .range([chartInnerHeight, 0])
    .nice();

  return (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <Marks
          data={csvData}
          xScale={xScale}
          yScale={yScale}
          xValueAccessor={xValueAccessor}
          yValueAccessor={yValueAccessor}
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
          // from d3-time-format
          tickValueFormatter={timeFormat('%a')}
        />

        <AxisLeft yScale={yScale} chartInnerWidth={chartInnerWidth} />
      </g>
    </svg>
  );
};

export { LineChart };
