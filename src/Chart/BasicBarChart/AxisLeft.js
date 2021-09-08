/* yScale is using band scale and it does not have ticks(), use domain() instead */

const AxisLeft = ({ yScale }) => {
  return yScale.domain().map((tickValue) => {
    // yScale return the position from top of top of the bar
    // by position from top of the bar + half of the height of the bar
    return (
      <text
        key={tickValue}
        style={{ textAnchor: 'end' }}
        dy="3"
        dx="-.8em"
        y={yScale(tickValue) + yScale.bandwidth() / 2}
      >
        {tickValue}
      </text>
    );
  });
};

export { AxisLeft };
