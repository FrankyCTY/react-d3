import React from 'react';
import { scaleLinear, scaleOrdinal, extent, format } from 'd3';
import { useFetchCsvData } from './useFetchCsvData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { ColorLegend } from './ColorLegend';

const svgWidth = 960;
const svgHeight = 500;
const margin = { top: 20, right: 140, bottom: 90, left: 200 };

const chartInnerHeight = svgHeight - margin.top - margin.bottom;
const chartInnerWidth = svgWidth - margin.left - margin.right;

const xAxisLabelOffset = 80;
const yAxisLabelOffset = 80;

const horizontalTickLabelOffsetY = 25;

const csvUrl =
  'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv';

const xAxisLabel = 'Sepal Length';
const yAxisLabel = 'Sepal Width';
const colorLegendLabel = 'Species';
const xValueAccessor = (d) => d.sepal_length;
const yValueAccessor = (d) => d.sepal_width;
const colorValueAccessor = (d) => d.species;

const colorLegendOffsetX = 50;

const ScatterPot = () => {
  const csvData = useFetchCsvData(csvUrl);
  const [hoveredValue, setHoveredValue] = React.useState();

  if (!csvData) return <pre>Loading...</pre>;

  const filteredData = csvData.filter(
    (d) => colorValueAccessor(d) === hoveredValue
  );

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

        <g transform={`translate(${chartInnerWidth + colorLegendOffsetX}, 60)`}>
          <text
            x={colorLegendOffsetX - 20}
            y={-30}
            style={{ textAnchor: 'middle', fontSize: '2em' }}
          >
            {colorLegendLabel}
          </text>
          <ColorLegend
            colorScale={colorScale}
            onTickHover={setHoveredValue}
            hoveredValue={hoveredValue}
          />
        </g>

        {/* Mask layer */}
        <g opacity={hoveredValue ? 0.2 : 1}>
          <Marks
            data={csvData}
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            xValueAccessor={xValueAccessor}
            yValueAccessor={yValueAccessor}
            colorValueAccessor={colorValueAccessor}
          />
        </g>
        <Marks
          data={filteredData}
          xScale={xScale}
          yScale={yScale}
          colorScale={colorScale}
          xValueAccessor={xValueAccessor}
          yValueAccessor={yValueAccessor}
          colorValueAccessor={colorValueAccessor}
        />
      </g>
    </svg>
  );
};

export { ScatterPot };
