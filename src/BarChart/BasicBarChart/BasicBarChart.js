import React from 'react';
import { scaleBand, scaleLinear, max, format } from 'd3';
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

const horizontalTickLabelOffsetY = 25;

const csvUrl =
  'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';

/*
	BarChart with Y axis: Country, X axis: Population

	1. Parse csv to get the csv data
	2. Define Scaling for Y axis (scaleBand is used, since it is the bar root data)
	3. Define Scaling for X axis (scaleLinear is used for continuous quantitative data)
	4. Define margin between svg frame and the bar chart, and use it to calculate the translation and chartInnerHeight / width
	   to leave spaces for ticks, tick labels etc.
	5. Configure and render ticks
*/

const yValueAccessor = (d) => d.Country;
const xValueAccessor = (d) => d.Population;

const BasicBarChart = () => {
  const csvData = useFetchCsvData(csvUrl);

  if (!csvData) return <pre>Loading...</pre>;

  // BandScale for  position-encoding ordinal data (bars in a bar chart or dots in an categorical scatterplot)
  // country in y axis
  const yScale = scaleBand()
    .domain(csvData.map(yValueAccessor))
    .range([0, chartInnerHeight])
    .paddingInner(0.15);

  const xScale = scaleLinear()
    .domain([0, max(csvData, xValueAccessor)])
    .range([0, chartInnerWidth]);

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
          x={chartInnerWidth / 2}
          y={chartInnerHeight + xAxisLabelOffset}
          style={{ textAnchor: 'middle', fontSize: '2em' }}
        >
          Population
        </text>
        <AxisBottom
          xScale={xScale}
          chartInnerHeight={chartInnerHeight}
          horizontalTickLabelOffsetY={horizontalTickLabelOffsetY}
          tickValueFormatter={(n) => format('.2s')(n).replace('G', 'B')}
        />

        <AxisLeft yScale={yScale} />
      </g>
    </svg>
  );
};

export { BasicBarChart };
