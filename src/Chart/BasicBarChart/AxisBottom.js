import React from 'react';

const AxisBottom = ({
  xScale,
  chartInnerHeight,
  horizontalTickLabelOffsetY,
  tickValueFormatter = (v) => v,
}) => {
  return xScale.ticks().map((tickValue) => (
    <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
      <line y2={chartInnerHeight} stroke="black" />
      <text
        style={{ textAnchor: 'middle' }}
        y={chartInnerHeight + horizontalTickLabelOffsetY}
      >
        {tickValueFormatter(tickValue)}
      </text>
    </g>
  ));
};

export { AxisBottom };
