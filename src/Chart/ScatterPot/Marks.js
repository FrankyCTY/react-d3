import React from 'react';

const Marks = ({ data, yScale, xScale, xValueAccessor, yValueAccessor }) => {
  return data.map((d) => {
    return (
      <circle
        cx={xScale(xValueAccessor(d))}
        cy={yScale(yValueAccessor(d))}
        r={10}
      ></circle>
    );
  });
};

export { Marks };
