import React from 'react';

const Marks = ({
  data,
  yScale,
  xScale,
  colorScale,
  xValueAccessor,
  yValueAccessor,
  colorValueAccessor,
}) => {
  return data.map((d) => {
    return (
      <circle
        // use domain value to extract exact range value from the scale
        cx={xScale(xValueAccessor(d))}
        cy={yScale(yValueAccessor(d))}
        fill={colorScale(colorValueAccessor(d))}
        r={10}
      ></circle>
    );
  });
};

export { Marks };
