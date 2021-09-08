/* yScale is using band scale and it does not have ticks(), use domain() instead */

const AxisLeft = ({ yScale, chartInnerWidth }) => {
  return yScale.ticks().map((tickValue) => {
    // yScale return the position from top of top of the bar
    // by position from top of the bar + half of the height of the bar
    return (
      <g transform={`translate(0,${yScale(tickValue)})`}>
        <line x2={chartInnerWidth} stroke="black" />
        <text key={tickValue} style={{ textAnchor: 'end' }} dy="3" dx="-.8em">
          {tickValue}
        </text>
      </g>
    );
  });
};

export { AxisLeft };
