const ColorLegend = ({
  colorScale,
  tickSpacing = 30,
  tickSize = 10,
  tickTextOffsetX = 20,
  onTickHover,
  hoveredValue,
}) => {
  // domain return the species
  return colorScale.domain().map((domainValue, idx) => (
    <g
      transform={`translate(0, ${idx * tickSpacing})`}
      onMouseEnter={() => onTickHover(domainValue)}
      onMouseOut={() => {
        onTickHover(null);
      }}
      opacity={hoveredValue && hoveredValue !== domainValue ? 0.2 : 1}
    >
      <circle fill={colorScale(domainValue)} r={tickSize} />
      <text x={tickTextOffsetX} dy=".32em" style={{ cursor: 'default' }}>
        {domainValue}
      </text>
    </g>
  ));
};

export { ColorLegend };
